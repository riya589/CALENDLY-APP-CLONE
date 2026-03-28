import "dotenv/config";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const defaultUser = await prisma.user.upsert({
    where: { email: "admin@calendlyclone.com" },
    update: {
      name: "Default Admin",
      timezone: process.env.DEFAULT_TIMEZONE ?? "Asia/Kolkata"
    },
    create: {
      name: "Default Admin",
      email: "admin@calendlyclone.com",
      timezone: process.env.DEFAULT_TIMEZONE ?? "Asia/Kolkata"
    }
  });

  const eventTypes = [
    {
      name: "30 Minute Meeting",
      slug: "30-minute-meeting",
      duration: 30,
      description: "A short sync for planning, alignment, or introductions.",
      color: "#006bff"
    },
    {
      name: "60 Minute Strategy Call",
      slug: "60-minute-strategy-call",
      duration: 60,
      description: "A deeper strategy discussion for roadmap or consulting sessions.",
      color: "#0f766e"
    },
    {
      name: "Interview Slot",
      slug: "interview-slot",
      duration: 45,
      description: "A structured interview slot for candidate conversations.",
      color: "#7c3aed"
    }
  ];

  for (const eventType of eventTypes) {
    await prisma.eventType.upsert({
      where: { slug: eventType.slug },
      update: {
        ...eventType,
        userId: defaultUser.id,
        isActive: true
      },
      create: {
        ...eventType,
        userId: defaultUser.id,
        isActive: true
      }
    });
  }

  const weeklyAvailability = [
    { dayOfWeek: 0, startTime: "09:00", endTime: "17:00", isAvailable: false },
    { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isAvailable: true },
    { dayOfWeek: 2, startTime: "10:00", endTime: "16:00", isAvailable: true },
    { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isAvailable: true },
    { dayOfWeek: 4, startTime: "10:00", endTime: "18:00", isAvailable: true },
    { dayOfWeek: 5, startTime: "09:00", endTime: "15:00", isAvailable: true },
    { dayOfWeek: 6, startTime: "09:00", endTime: "17:00", isAvailable: false }
  ];

  for (const slot of weeklyAvailability) {
    await prisma.availability.upsert({
      where: {
        userId_dayOfWeek: {
          userId: defaultUser.id,
          dayOfWeek: slot.dayOfWeek
        }
      },
      update: slot,
      create: {
        userId: defaultUser.id,
        ...slot
      }
    });
  }

  const thirtyMinuteMeeting = await prisma.eventType.findUniqueOrThrow({
    where: { slug: "30-minute-meeting" }
  });

  const now = new Date();
  const upcomingStart = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  upcomingStart.setHours(11, 0, 0, 0);
  const upcomingEnd = new Date(upcomingStart.getTime() + 30 * 60 * 1000);

  const pastStart = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  pastStart.setHours(14, 0, 0, 0);
  const pastEnd = new Date(pastStart.getTime() + 30 * 60 * 1000);

  await prisma.booking.upsert({
    where: { id: "seed-upcoming-booking" },
    update: {
      startDateTime: upcomingStart,
      endDateTime: upcomingEnd,
      inviteeName: "Riya Sharma",
      inviteeEmail: "riya@example.com",
      timezone: defaultUser.timezone,
      status: "SCHEDULED"
    },
    create: {
      id: "seed-upcoming-booking",
      eventTypeId: thirtyMinuteMeeting.id,
      userId: defaultUser.id,
      inviteeName: "Riya Sharma",
      inviteeEmail: "riya@example.com",
      startDateTime: upcomingStart,
      endDateTime: upcomingEnd,
      timezone: defaultUser.timezone,
      status: "SCHEDULED"
    }
  });

  await prisma.booking.upsert({
    where: { id: "seed-past-booking" },
    update: {
      startDateTime: pastStart,
      endDateTime: pastEnd,
      inviteeName: "Aarav Patel",
      inviteeEmail: "aarav@example.com",
      timezone: defaultUser.timezone,
      status: "SCHEDULED"
    },
    create: {
      id: "seed-past-booking",
      eventTypeId: thirtyMinuteMeeting.id,
      userId: defaultUser.id,
      inviteeName: "Aarav Patel",
      inviteeEmail: "aarav@example.com",
      startDateTime: pastStart,
      endDateTime: pastEnd,
      timezone: defaultUser.timezone,
      status: "SCHEDULED"
    }
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
