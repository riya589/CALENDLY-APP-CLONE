import type { Request, Response } from "express";

import { sendSuccess } from "../utils/api-response.js";
import {
  getAvailabilitySettings,
  updateAvailabilitySettings
} from "../services/availability.service.js";

export async function getAvailabilityController(_req: Request, res: Response) {
  const availability = await getAvailabilitySettings();
  return sendSuccess(res, availability, "Availability fetched successfully");
}

export async function updateAvailabilityController(req: Request, res: Response) {
  const validated = req.validated as {
    body: {
      timezone: string;
      availability: Array<{
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
      }>;
    };
  };

  const updatedAvailability = await updateAvailabilitySettings(
    validated.body.timezone,
    validated.body.availability
  );

  return sendSuccess(res, updatedAvailability, "Availability updated successfully");
}

