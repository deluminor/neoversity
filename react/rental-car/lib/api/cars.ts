import { API_ENDPOINTS } from "@/constants/api";
import { CarSchema, CarsResponseSchema } from "@/lib/schemas/car.schema";
import { CarFiltersOptionsSchema } from "@/lib/schemas/filters.schema";
import { buildCarsQuery } from "@/lib/utils/build-cars-query";
import type { Car, CarsResponse } from "@/types/car";
import type { CarFilters, CarFiltersOptions } from "@/types/filters";

import { parseResponse, request } from "./http";

export async function fetchCars(
  filters: CarFilters,
  page: number,
  signal?: AbortSignal,
): Promise<CarsResponse> {
  const data = await request(API_ENDPOINTS.cars, {
    params: buildCarsQuery(filters, page),
    signal,
  });

  return parseResponse(CarsResponseSchema, data);
}

export async function fetchCarById(carId: string, signal?: AbortSignal): Promise<Car> {
  const data = await request(API_ENDPOINTS.car(carId), { signal });
  return parseResponse(CarSchema, data);
}

export async function fetchCarFiltersOptions(signal?: AbortSignal): Promise<CarFiltersOptions> {
  const data = await request(API_ENDPOINTS.carsFilters, { signal });
  return parseResponse(CarFiltersOptionsSchema, data);
}
