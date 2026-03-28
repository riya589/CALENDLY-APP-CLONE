export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" }
] as const;

export const dashboardLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Event Types", href: "/dashboard/event-types" },
  { label: "Availability", href: "/dashboard/availability" },
  { label: "Meetings", href: "/dashboard/meetings" }
];

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
] as const;

export const timezoneOptions = [
  "Asia/Kolkata",
  "UTC",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney"
];
