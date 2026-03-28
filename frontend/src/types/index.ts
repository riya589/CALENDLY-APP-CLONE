export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  details?: Array<{
    path: string;
    message: string;
  }> | null;
};

export type EventType = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string | null;
  duration: number;
  color: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AvailabilityItem = {
  id: string;
  userId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AvailabilityResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    timezone: string;
  };
  availability: AvailabilityItem[];
};

export type BookingStatus = "SCHEDULED" | "CANCELLED";

export type Booking = {
  id: string;
  inviteeName: string;
  inviteeEmail: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  status: BookingStatus;
  eventType: {
    id: string;
    name: string;
    slug: string;
    duration: number;
  };
};

export type PublicEvent = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  duration: number;
  color: string | null;
  organizer: {
    name: string;
    timezone: string;
  };
};

export type PublicSlotsResponse = {
  date: string;
  timezone: string;
  slots: string[];
};

export type CreatedBooking = {
  id: string;
  status: BookingStatus;
  timezone: string;
  inviteeName: string;
  inviteeEmail: string;
  startDateTime: string;
  endDateTime: string;
  eventType: {
    id: string;
    name: string;
    slug: string;
    duration: number;
  };
  organizer: {
    id: string;
    name: string;
    timezone: string;
  };
};

export type DashboardStats = {
  totalEventTypes: number;
  upcomingMeetings: number;
  pastMeetings: number;
  activeAvailabilityDays: number;
};
