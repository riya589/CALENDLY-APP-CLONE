import { apiClient } from "./client";
import type { ApiResponse, AvailabilityResponse } from "@/types";

export type AvailabilityPayload = {
  timezone: string;
  availability: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
};

export async function getAvailability() {
  const response = await apiClient.get<ApiResponse<AvailabilityResponse>>("/availability");
  return response.data.data;
}

export async function updateAvailability(payload: AvailabilityPayload) {
  const response = await apiClient.put<ApiResponse<AvailabilityResponse>>("/availability", payload);
  return response.data.data;
}

