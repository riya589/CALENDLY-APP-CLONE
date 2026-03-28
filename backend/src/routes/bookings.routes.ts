import { Router } from "express";

import {
  cancelBookingController,
  getPastBookingsController,
  getUpcomingBookingsController
} from "../controllers/bookings.controller.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { cancelBookingSchema } from "../validators/booking.schemas.js";

export const bookingsRouter = Router();

bookingsRouter.get("/upcoming", asyncHandler(getUpcomingBookingsController));
bookingsRouter.get("/past", asyncHandler(getPastBookingsController));
bookingsRouter.patch("/:id/cancel", validate(cancelBookingSchema), asyncHandler(cancelBookingController));

