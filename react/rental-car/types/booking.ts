import type { z } from "zod";

import type { BookingFormSchema, BookingResponseSchema } from "@/lib/schemas/booking.schema";

export type BookingFormValues = z.infer<typeof BookingFormSchema>;

export type BookingResponse = z.infer<typeof BookingResponseSchema>;
