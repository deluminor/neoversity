import { API_ENDPOINTS } from "@/constants/api";
import { BookingResponseSchema } from "@/lib/schemas/booking.schema";
import type { BookingFormValues, BookingResponse } from "@/types/booking";

import { parseResponse, request } from "./http";

export async function createBookingRequest(
  carId: string,
  values: BookingFormValues,
): Promise<BookingResponse> {
  const data = await request(API_ENDPOINTS.carBookingRequests(carId), {
    method: "POST",
    body: values,
  });

  return parseResponse(BookingResponseSchema, data);
}
