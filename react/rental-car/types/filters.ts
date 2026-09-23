import type { z } from "zod";

import type { CarFiltersOptionsSchema } from "@/lib/schemas/filters.schema";

export type CarFiltersOptions = z.infer<typeof CarFiltersOptionsSchema>;

export type CarPriceRange = CarFiltersOptions["price"];

export interface CarFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface CarFiltersDraft {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}
