import { PER_PAGE } from "@/constants/pagination";
import type { QueryParams } from "@/types/api";
import type { CarFilters } from "@/types/filters";

export function buildCarsQuery(filters: CarFilters, page: number): QueryParams {
  return {
    page,
    perPage: PER_PAGE,
    brand: filters.brand,
    price: filters.price,
    minMileage: filters.minMileage,
    maxMileage: filters.maxMileage,
  };
}
