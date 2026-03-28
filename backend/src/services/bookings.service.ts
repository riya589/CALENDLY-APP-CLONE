import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/app-error.js";
import { getDefaultAdminUser } from "./default-user.service.js";

type BookingStatusValue = "SCHEDULED" | "CANCELLED";

function mapBooking(booking: {
  id: string;
  inviteeName: string;
  inviteeEmail: string;
  startDateTime: Date;
  endDateTime: Date;
  timezone: string;
  status: BookingStatusValue;
  eventType: {
    id: string;
    name: string;
    slug: string;
    duration: number;
  };
}) {
  return {
    id: booking.id,
    inviteeName: booking.inviteeName,
    inviteeEmail: booking.inviteeEmail,
    startDateTime: booking.startDateTime,
    endDateTime: booking.endDateTime,
    timezone: booking.timezone,
    status: booking.status,
    eventType: booking.eventType
  };
}

export async function listUpcomingBookings() {
  const user = await getDefaultAdminUser();

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      startDateTime: {
        gte: new Date()
      }
    },
    include: {
      eventType: {
        select: {
          id: true,
          name: true,
          slug: true,
          duration: true
        }
      }
    },
    orderBy: {
      startDateTime: "asc"
    }
  });

  return bookings.map(mapBooking);
}

export async function listPastBookings() {
  const user = await getDefaultAdminUser();

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      startDateTime: {
        lt: new Date()
      }
    },
    include: {
      eventType: {
        select: {
          id: true,
          name: true,
          slug: true,
          duration: true
        }
      }
    },
    orderBy: {
      startDateTime: "desc"
    }
  });

  return bookings.map(mapBooking);
}

export async function cancelBooking(id: string) {
  const user = await getDefaultAdminUser();

  const booking = await prisma.booking.findFirst({
    where: {
      id,
      userId: user.id
    },
    include: {
      eventType: {
        select: {
          id: true,
          name: true,
          slug: true,
          duration: true
        }
      }
    }
  });

  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  if (booking.status === "CANCELLED") {
    throw new AppError(400, "Booking is already cancelled");
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      status: "CANCELLED"
    },
    include: {
      eventType: {
        select: {
          id: true,
          name: true,
          slug: true,
          duration: true
        }
      }
    }
  });

  return mapBooking(updatedBooking);
}
