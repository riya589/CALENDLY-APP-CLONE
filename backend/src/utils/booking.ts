import { minutesToTimeString, timeStringToMinutes } from "./time.js";

export function generateSlotsBetween(
  startTime: string,
  endTime: string,
  duration: number
) {
  const startMinutes = timeStringToMinutes(startTime);
  const endMinutes = timeStringToMinutes(endTime);
  const slots: string[] = [];

  for (let cursor = startMinutes; cursor + duration <= endMinutes; cursor += duration) {
    slots.push(minutesToTimeString(cursor));
  }

  return slots;
}

export function isBookingActive(status: "SCHEDULED" | "CANCELLED") {
  return status === "SCHEDULED";
}
