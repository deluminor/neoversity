import type { z } from "zod";

import type { CarLocationSchema, CarSchema, CarsResponseSchema } from "@/lib/schemas/car.schema";

export type CarLocation = z.infer<typeof CarLocationSchema>;

export type Car = z.infer<typeof CarSchema>;

export type CarsResponse = z.infer<typeof CarsResponseSchema>;
