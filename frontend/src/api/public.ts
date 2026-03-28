import { apiClient } from "./client";
import type {
  ApiResponse,
  CreatedBooking,
  PublicEvent,
  PublicSlotsResponse
} from "@/types";

export type CreateBookingPayload = {
  eventTypeId?: string;
  slug?: string;
  inviteeName: string;
  inviteeEmail: string;
  date: string;
  time: string;
  timezone: string;
};

export async function getPublicEvent(slug: string) {
  const response = await apiClient.get<ApiResponse<PublicEvent>>(`/public/event/${slug}`);
  return response.data.data;
}

export async function getPublicSlots(slug: string, date: string) {
  const response = await apiClient.get<ApiResponse<PublicSlotsResponse>>(
    `/public/event/${slug}/slots`,
    { params: { date } }
  );
  return response.data.data;
}

export async function createBooking(payload: CreateBookingPayload) {
  const response = await apiClient.post<ApiResponse<CreatedBooking>>("/public/book", payload);
  return response.data.data;
}

