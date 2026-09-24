import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { FIRST_PAGE } from "@/constants/pagination";
import { fetchCarFiltersOptions, fetchCars } from "@/lib/api/cars";
import type { CarFilters } from "@/types/filters";

export const carsKeys = {
  lists: ["cars", "list"] as const,
  list: (filters: CarFilters) => ["cars", "list", filters] as const,
  filterOptions: () => ["car-filter-options"] as const,
};

export function carsInfiniteQueryOptions(filters: CarFilters) {
  return infiniteQueryOptions({
    queryKey: carsKeys.list(filters),
    queryFn: ({ pageParam, signal }) => fetchCars(filters, pageParam, signal),
    initialPageParam: FIRST_PAGE,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}

export function carFilterOptionsQueryOptions() {
  return queryOptions({
    queryKey: carsKeys.filterOptions(),
    queryFn: ({ signal }) => fetchCarFiltersOptions(signal),
    staleTime: Number.POSITIVE_INFINITY,
  });
}
