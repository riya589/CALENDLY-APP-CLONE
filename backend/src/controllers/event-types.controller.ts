import type { Request, Response } from "express";

import { sendSuccess } from "../utils/api-response.js";
import {
  createEventType,
  deleteEventType,
  getEventTypeById,
  listEventTypes,
  updateEventType
} from "../services/event-types.service.js";

export async function getEventTypesController(_req: Request, res: Response) {
  const eventTypes = await listEventTypes();
  return sendSuccess(res, eventTypes, "Event types fetched successfully");
}

export async function getEventTypeByIdController(req: Request, res: Response) {
  const validated = req.validated as { params: { id: string } };
  const eventType = await getEventTypeById(validated.params.id);
  return sendSuccess(res, eventType, "Event type fetched successfully");
}

export async function createEventTypeController(req: Request, res: Response) {
  const validated = req.validated as {
    body: {
      name: string;
      duration: number;
      slug: string;
      description?: string;
      color?: string;
      isActive?: boolean;
    };
  };

  const eventType = await createEventType(validated.body);
  return sendSuccess(res, eventType, "Event type created successfully", 201);
}

export async function updateEventTypeController(req: Request, res: Response) {
  const validated = req.validated as {
    params: { id: string };
    body: {
      name: string;
      duration: number;
      slug: string;
      description?: string;
      color?: string;
      isActive?: boolean;
    };
  };

  const eventType = await updateEventType(validated.params.id, validated.body);
  return sendSuccess(res, eventType, "Event type updated successfully");
}

export async function deleteEventTypeController(req: Request, res: Response) {
  const validated = req.validated as { params: { id: string } };
  const deletedEventType = await deleteEventType(validated.params.id);

  return sendSuccess(res, deletedEventType, "Event type deleted successfully");
}

