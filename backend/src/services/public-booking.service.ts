import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/app-error.js";
import { generateSlotsBetween } from "../utils/booking.js";
import { combineDateAndTime, isSameCalendarDate } from "../utils/time.js";

async function getActiveEventTypeBySlug(slug: string) {
  const eventType = await prisma.eventType.findFirst({
    where: {
      slug,
      isActive: true
    },
    include: {
      user: true
    }
  });

  if (!eventType) {
    throw new AppError(404, "Public event not found");
  }

  return eventType;
}

async function getEventTypeFromPayload(eventTypeId?: string, slug?: string) {
  const eventType = eventTypeId
    ? await prisma.eventType.findFirst({
        where: { id: eventTypeId, isActive: true },
        include: { user: true }
      })
    : await prisma.eventType.findFirst({
        where: { slug, isActive: true },
        include: { user: true }
      });

  if (!eventType) {
    throw new AppError(404, "Event type not found");
  }

  return eventType;
}

export async function getPublicEventBySlug(slug: string) {
  const eventType = await getActiveEventTypeBySlug(slug);

  return {
    id: eventType.id,
    name: eventType.name,
    slug: eventType.slug,
    description: eventType.description,
    duration: eventType.duration,
    color: eventType.color,
    organizer: {
      name: eventType.user.name,
      timezone: eventType.user.timezone
    }
  };
}

export async function getAvailableSlots(slug: string, date: string) {
  const eventType = await getActiveEventTypeBySlug(slug);
  const selectedDate = new Date(`${date}T00:00:00`);
  const now = new Date();

  if (Number.isNaN(selectedDate.getTime())) {
    throw new AppError(400, "Please select a valid date");
  }

  if (selectedDate < new Date(now.toDateString())) {
    return {
      date,
      timezone: eventType.user.timezone,
      slots: []
    };
  }

  const dayOfWeek = selectedDate.getDay();

  const availability = await prisma.availability.findUnique({
    where: {
      userId_dayOfWeek: {
        userId: eventType.userId,
        dayOfWeek
      }
    }
  });

  if (!availability || !availability.isAvailable) {
    return {
      date,
      timezone: eventType.user.timezone,
      slots: []
    };
  }

  const candidateSlots = generateSlotsBetween(
    availability.startTime,
    availability.endTime,
    eventType.duration
  );

  const dayStart = new Date(`${date}T00:00:00`);
  const dayEnd = new Date(`${date}T23:59:59.999`);

  const existingBookings = await prisma.booking.findMany({
    where: {
      eventTypeId: eventType.id,
      status: "SCHEDULED",
      startDateTime: {
        gte: dayStart,
        lte: dayEnd
      }
    },
    select: {
      startDateTime: true
    }
  });

  const bookedTimes = new Set(
    existingBookings.map((booking) =>
      booking.startDateTime.toTimeString().slice(0, 5)
    )
  );

  const availableSlots = candidateSlots.filter((slot) => {
    if (bookedTimes.has(slot)) {
      return false;
    }

    const slotDateTime = combineDateAndTime(date, slot);

    if (isSameCalendarDate(slotDateTime, now) && slotDateTime <= now) {
      return false;
    }

    return true;
  });

  return {
    date,
    timezone: eventType.user.timezone,
    slots: availableSlots
  };
}

export async function createPublicBooking(input: {
  eventTypeId?: string;
  slug?: string;
  inviteeName: string;
  inviteeEmail: string;
  date: string;
  time: string;
  timezone: string;
}) {
  const eventType = await getEventTypeFromPayload(input.eventTypeId, input.slug);
  const requestedStartDateTime = combineDateAndTime(input.date, input.time);

  if (requestedStartDateTime <= new Date()) {
    throw new AppError(400, "Please select a future time slot");
  }

  const slotAvailability = await getAvailableSlots(eventType.slug, input.date);

  if (!slotAvailability.slots.includes(input.time)) {
    throw new AppError(409, "This slot has already been booked");
  }

  const startDateTime = requestedStartDateTime;
  const endDateTime = new Date(startDateTime.getTime() + eventType.duration * 60 * 1000);

  try {
    const booking = await prisma.$transaction(
      async (tx) => {
        const conflictingBooking = await tx.booking.findFirst({
          where: {
            eventTypeId: eventType.id,
            startDateTime,
            status: "SCHEDULED"
          }
        });

        if (conflictingBooking) {
          throw new AppError(409, "This slot has already been booked");
        }

        return tx.booking.create({
          data: {
            eventTypeId: eventType.id,
            userId: eventType.userId,
            inviteeName: input.inviteeName.trim(),
            inviteeEmail: input.inviteeEmail.trim().toLowerCase(),
            startDateTime,
            endDateTime,
            timezone: input.timezone,
            status: "SCHEDULED"
          },
          include: {
            eventType: true,
            user: true
          }
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
      }
    );

    return {
      id: booking.id,
      status: booking.status,
      timezone: booking.timezone,
      inviteeName: booking.inviteeName,
      inviteeEmail: booking.inviteeEmail,
      startDateTime: booking.startDateTime,
      endDateTime: booking.endDateTime,
      eventType: {
        id: booking.eventType.id,
        name: booking.eventType.name,
        slug: booking.eventType.slug,
        duration: booking.eventType.duration
      },
      organizer: {
        id: booking.user.id,
        name: booking.user.name,
        timezone: booking.user.timezone
      }
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(409, "This slot has already been booked");
  }
}
