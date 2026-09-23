import { z } from "zod";

export const BookingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .regex(/^[\p{L}][\p{L}\s'-]*$/u, "Please enter your name."),
  email: z.string().trim().pipe(z.email("Please enter your email.")),
  comment: z.string().trim().min(1, "Comment is required"),
});

export const BookingResponseSchema = z.object({
  message: z.string().optional(),
});
