import { useInfiniteQuery } from "@tanstack/react-query";

import { carsInfiniteQueryOptions } from "@/lib/query/car-queries";
import type { Car } from "@/types/car";
import type { CarFilters } from "@/types/filters";

export function useCarsInfiniteQuery(filters: CarFilters) {
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(carsInfiniteQueryOptions(filters));

  const cars: Car[] = data?.pages.flatMap((page) => page.cars) ?? [];

  return {
    cars,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  };
}
