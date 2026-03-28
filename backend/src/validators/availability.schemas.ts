import { z } from "zod";

import { timeStringSchema } from "./common.schemas.js";

const availabilityItemSchema = z
  .object({
    dayOfWeek: z.coerce.number().int().min(0).max(6),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    isAvailable: z.boolean()
  })
  .superRefine((value, ctx) => {
    if (value.isAvailable && value.startTime >= value.endTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be later than start time",
        path: ["endTime"]
      });
    }
  });

export const updateAvailabilitySchema = z
  .object({
    body: z.object({
      timezone: z.string().trim().min(1, "Timezone is required"),
      availability: z.array(availabilityItemSchema).length(7, "Availability must contain all 7 weekdays")
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional()
  })
  .superRefine((value, ctx) => {
    const daySet = new Set(value.body.availability.map((item) => item.dayOfWeek));

    if (daySet.size !== 7) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Availability must include each dayOfWeek exactly once",
        path: ["body", "availability"]
      });
    }
  });

