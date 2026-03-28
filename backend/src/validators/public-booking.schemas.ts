import { z } from "zod";

import { dateStringSchema, slugParamSchema, timeStringSchema } from "./common.schemas.js";

export const getPublicEventSchema = slugParamSchema;

export const getAvailableSlotsSchema = z.object({
  params: slugParamSchema.shape.params,
  query: z.object({
    date: dateStringSchema
  }),
  body: z.object({}).optional()
});

export const createPublicBookingSchema = z.object({
  params: z.object({}).optional(),
  query: z.object({}).optional(),
  body: z
    .object({
      eventTypeId: z.string().trim().min(1).optional(),
      slug: z.string().trim().min(1).optional(),
      inviteeName: z.string().trim().min(1, "Invitee name is required"),
      inviteeEmail: z.string().trim().email("Valid invitee email is required"),
      date: dateStringSchema,
      time: timeStringSchema,
      timezone: z.string().trim().min(1, "Timezone is required")
    })
    .refine((value) => Boolean(value.eventTypeId || value.slug), {
      message: "Either eventTypeId or slug is required",
      path: ["eventTypeId"]
    })
});

