import { format } from "date-fns";

export function formatDateTime(value: string | Date, pattern = "EEE, MMM d, yyyy") {
  return format(new Date(value), pattern);
}

export function formatTime(value: string | Date) {
  return format(new Date(value), "hh:mm a");
}

export function buildBookingUrl(slug: string) {
  return `${window.location.origin}/book/${slug}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function parseApiError(error: unknown, fallback = "Something went wrong") {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return fallback;
}

