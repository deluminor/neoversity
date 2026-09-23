import { useQuery } from "@tanstack/react-query";

import { carFilterOptionsQueryOptions } from "@/lib/query/car-queries";

export function useCarFilterOptions() {
  return useQuery(carFilterOptionsQueryOptions());
}
