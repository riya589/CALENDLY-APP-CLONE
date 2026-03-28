import type { Request, Response } from "express";

import { sendSuccess } from "../utils/api-response.js";
import {
  cancelBooking,
  listPastBookings,
  listUpcomingBookings
} from "../services/bookings.service.js";

export async function getUpcomingBookingsController(_req: Request, res: Response) {
  const bookings = await listUpcomingBookings();
  return sendSuccess(res, bookings, "Upcoming bookings fetched successfully");
}

export async function getPastBookingsController(_req: Request, res: Response) {
  const bookings = await listPastBookings();
  return sendSuccess(res, bookings, "Past bookings fetched successfully");
}

export async function cancelBookingController(req: Request, res: Response) {
  const validated = req.validated as { params: { id: string } };
  const booking = await cancelBooking(validated.params.id);
  return sendSuccess(res, booking, "Booking cancelled successfully");
}

