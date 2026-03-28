import { apiClient } from "./client";
import type { ApiResponse, EventType } from "@/types";

export type EventTypePayload = {
  name: string;
  duration: number;
  slug: string;
  description?: string;
  color?: string;
  isActive?: boolean;
};

export async function getEventTypes() {
  const response = await apiClient.get<ApiResponse<EventType[]>>("/event-types");
  return response.data.data;
}

export async function getEventTypeById(id: string) {
  const response = await apiClient.get<ApiResponse<EventType>>(`/event-types/${id}`);
  return response.data.data;
}

export async function createEventType(payload: EventTypePayload) {
  const response = await apiClient.post<ApiResponse<EventType>>("/event-types", payload);
  return response.data.data;
}

export async function updateEventType(id: string, payload: EventTypePayload) {
  const response = await apiClient.put<ApiResponse<EventType>>(`/event-types/${id}`, payload);
  return response.data.data;
}

export async function deleteEventType(id: string) {
  const response = await apiClient.delete<ApiResponse<EventType>>(`/event-types/${id}`);
  return response.data.data;
}

