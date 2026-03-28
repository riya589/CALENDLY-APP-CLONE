import type { Request, Response } from "express";

import { sendSuccess } from "../utils/api-response.js";
import {
  createPublicBooking,
  getAvailableSlots,
  getPublicEventBySlug
} from "../services/public-booking.service.js";

export async function getPublicEventController(req: Request, res: Response) {
  const validated = req.validated as { params: { slug: string } };
  const event = await getPublicEventBySlug(validated.params.slug);
  return sendSuccess(res, event, "Public event fetched successfully");
}

export async function getPublicSlotsController(req: Request, res: Response) {
  const validated = req.validated as {
    params: { slug: string };
    query: { date: string };
  };

  const slots = await getAvailableSlots(validated.params.slug, validated.query.date);
  return sendSuccess(res, slots, "Available slots fetched successfully");
}

export async function createPublicBookingController(req: Request, res: Response) {
  const validated = req.validated as {
    body: {
      eventTypeId?: string;
      slug?: string;
      inviteeName: string;
      inviteeEmail: string;
      date: string;
      time: string;
      timezone: string;
    };
  };

  const booking = await createPublicBooking(validated.body);
  return sendSuccess(res, booking, "Booking created successfully", 201);
}

