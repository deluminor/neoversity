import { z } from "zod";

export const CarLocationSchema = z.object({
  country: z.string(),
  city: z.string(),
  address: z.string().optional(),
});

export const CarSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.coerce.number(),
  type: z.string(),
  img: z.string().optional().default(""),
  description: z.string().optional().default(""),
  fuelConsumption: z.coerce.number().optional(),
  engine: z.string().optional().default(""),
  rentalPrice: z.coerce.number(),
  rentalCompany: z.string().optional().default(""),
  rentalConditions: z.array(z.string()).optional().default([]),
  features: z.array(z.string()).optional().default([]),
  mileage: z.coerce.number(),
  stockNumber: z.coerce.number().optional(),
  location: CarLocationSchema.optional(),
});

export const CarsResponseSchema = z.object({
  cars: z.array(CarSchema),
  totalCars: z.coerce.number(),
  page: z.coerce.number(),
  totalPages: z.coerce.number(),
});
