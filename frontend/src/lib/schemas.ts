import { z } from "zod";

export const eventTypeFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  duration: z.coerce.number().min(1, "Duration must be positive"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL friendly"),
  description: z.string().max(1000).optional(),
  color: z
    .string()
    .optional()
    .refine((value) => !value || /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value), {
      message: "Color must be a valid hex value"
    }),
  isActive: z.boolean().default(true)
});

export const bookingFormSchema = z.object({
  inviteeName: z.string().trim().min(1, "Name is required"),
  inviteeEmail: z.string().trim().email("Valid email is required")
});

export type EventTypeFormValues = z.infer<typeof eventTypeFormSchema>;
export type BookingFormValues = z.infer<typeof bookingFormSchema>;

