import { z } from "zod";

import { isValidDateString, isValidTimeString } from "../utils/time.js";

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required")
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
});

export const slugParamSchema = z.object({
  params: z.object({
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL friendly")
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
});

export const timeStringSchema = z
  .string()
  .refine((value) => isValidTimeString(value), "Time must be in HH:MM format");

export const dateStringSchema = z
  .string()
  .refine((value) => isValidDateString(value), "Date must be in YYYY-MM-DD format");

