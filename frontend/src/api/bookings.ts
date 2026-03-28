import { apiClient } from "./client";
import type { ApiResponse, Booking } from "@/types";

export async function getUpcomingBookings() {
  const response = await apiClient.get<ApiResponse<Booking[]>>("/bookings/upcoming");
  return response.data.data;
}

export async function getPastBookings() {
  const response = await apiClient.get<ApiResponse<Booking[]>>("/bookings/past");
  return response.data.data;
}

export async function cancelBooking(id: string) {
  const response = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
  return response.data.data;
}

