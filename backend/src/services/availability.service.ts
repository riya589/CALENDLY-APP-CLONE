import { prisma } from "../lib/prisma.js";
import { getDefaultAdminUser } from "./default-user.service.js";

type AvailabilityInput = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export async function getAvailabilitySettings() {
  const user = await getDefaultAdminUser();
  const availability = await prisma.availability.findMany({
    where: { userId: user.id },
    orderBy: { dayOfWeek: "asc" }
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      timezone: user.timezone
    },
    availability
  };
}

export async function updateAvailabilitySettings(
  timezone: string,
  availability: AvailabilityInput[]
) {
  const user = await getDefaultAdminUser();

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { timezone }
    }),
    ...availability.map((slot) =>
      prisma.availability.upsert({
        where: {
          userId_dayOfWeek: {
            userId: user.id,
            dayOfWeek: slot.dayOfWeek
          }
        },
        update: {
          startTime: slot.startTime,
          endTime: slot.endTime,
          isAvailable: slot.isAvailable
        },
        create: {
          userId: user.id,
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isAvailable: slot.isAvailable
        }
      })
    )
  ]);

  return getAvailabilitySettings();
}

