import { Router } from "express";

import {
  createEventTypeController,
  deleteEventTypeController,
  getEventTypeByIdController,
  getEventTypesController,
  updateEventTypeController
} from "../controllers/event-types.controller.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  createEventTypeSchema,
  getEventTypeByIdSchema,
  updateEventTypeSchema
} from "../validators/event-type.schemas.js";

export const eventTypesRouter = Router();

eventTypesRouter.get("/", asyncHandler(getEventTypesController));
eventTypesRouter.post("/", validate(createEventTypeSchema), asyncHandler(createEventTypeController));
eventTypesRouter.get("/:id", validate(getEventTypeByIdSchema), asyncHandler(getEventTypeByIdController));
eventTypesRouter.put("/:id", validate(updateEventTypeSchema), asyncHandler(updateEventTypeController));
eventTypesRouter.delete("/:id", validate(getEventTypeByIdSchema), asyncHandler(deleteEventTypeController));

