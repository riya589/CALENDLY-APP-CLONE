const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function isValidTimeString(value: string) {
  return TIME_REGEX.test(value);
}

export function isValidDateString(value: string) {
  if (!DATE_REGEX.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}` === value;
}

export function timeStringToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTimeString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function combineDateAndTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

export function isSameCalendarDate(left: Date, right: Date) {
  return left.toDateString() === right.toDateString();
}
