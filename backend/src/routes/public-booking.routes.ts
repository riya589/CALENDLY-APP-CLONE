import { Router } from "express";

import {
  createPublicBookingController,
  getPublicEventController,
  getPublicSlotsController
} from "../controllers/public-booking.controller.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  createPublicBookingSchema,
  getAvailableSlotsSchema,
  getPublicEventSchema
} from "../validators/public-booking.schemas.js";

export const publicBookingRouter = Router();

publicBookingRouter.get("/event/:slug", validate(getPublicEventSchema), asyncHandler(getPublicEventController));
publicBookingRouter.get(
  "/event/:slug/slots",
  validate(getAvailableSlotsSchema),
  asyncHandler(getPublicSlotsController)
);
publicBookingRouter.post("/book", validate(createPublicBookingSchema), asyncHandler(createPublicBookingController));

