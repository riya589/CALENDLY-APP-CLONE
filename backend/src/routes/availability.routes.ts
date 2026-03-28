import { Router } from "express";

import {
  getAvailabilityController,
  updateAvailabilityController
} from "../controllers/availability.controller.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { updateAvailabilitySchema } from "../validators/availability.schemas.js";

export const availabilityRouter = Router();

availabilityRouter.get("/", asyncHandler(getAvailabilityController));
availabilityRouter.put("/", validate(updateAvailabilitySchema), asyncHandler(updateAvailabilityController));

