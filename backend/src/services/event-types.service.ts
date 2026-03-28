import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/app-error.js";
import { getDefaultAdminUser } from "./default-user.service.js";

type EventTypePayload = {
  name: string;
  duration: number;
  slug: string;
  description?: string;
  color?: string;
  isActive?: boolean;
};

function mapOptionalString(value?: string) {
  return value?.trim() ? value.trim() : null;
}

export async function listEventTypes() {
  const user = await getDefaultAdminUser();

  return prisma.eventType.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });
}

export async function getEventTypeById(id: string) {
  const user = await getDefaultAdminUser();

  const eventType = await prisma.eventType.findFirst({
    where: {
      id,
      userId: user.id
    }
  });

  if (!eventType) {
    throw new AppError(404, "Event type not found");
  }

  return eventType;
}

export async function createEventType(payload: EventTypePayload) {
  const user = await getDefaultAdminUser();

  const existing = await prisma.eventType.findUnique({
    where: { slug: payload.slug }
  });

  if (existing) {
    throw new AppError(409, "Event slug already exists");
  }

  return prisma.eventType.create({
    data: {
      userId: user.id,
      name: payload.name.trim(),
      duration: payload.duration,
      slug: payload.slug.trim(),
      description: mapOptionalString(payload.description),
      color: mapOptionalString(payload.color),
      isActive: payload.isActive ?? true
    }
  });
}

export async function updateEventType(id: string, payload: EventTypePayload) {
  const current = await getEventTypeById(id);

  const conflicting = await prisma.eventType.findFirst({
    where: {
      slug: payload.slug,
      NOT: {
        id: current.id
      }
    }
  });

  if (conflicting) {
    throw new AppError(409, "Event slug already exists");
  }

  return prisma.eventType.update({
    where: { id: current.id },
    data: {
      name: payload.name.trim(),
      duration: payload.duration,
      slug: payload.slug.trim(),
      description: mapOptionalString(payload.description),
      color: mapOptionalString(payload.color),
      isActive: payload.isActive ?? current.isActive
    }
  });
}

export async function deleteEventType(id: string) {
  const eventType = await getEventTypeById(id);

  await prisma.eventType.delete({
    where: { id: eventType.id }
  });

  return eventType;
}
