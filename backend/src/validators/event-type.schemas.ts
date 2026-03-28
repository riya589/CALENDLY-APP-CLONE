import { z } from "zod";

import { idParamSchema } from "./common.schemas.js";

const eventTypeBody = z.object({
  name: z.string().trim().min(1, "Name is required"),
  duration: z.coerce.number().int().positive("Duration must be positive"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL friendly"),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  color: z
    .string()
    .trim()
    .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, "Color must be a valid hex code")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().optional()
});

export const createEventTypeSchema = z.object({
  body: eventTypeBody,
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const updateEventTypeSchema = z.object({
  params: idParamSchema.shape.params,
  body: eventTypeBody,
  query: z.object({}).optional()
});

export const getEventTypeByIdSchema = idParamSchema;

