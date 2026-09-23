import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";

import { logError } from "@/lib/logger";
import { carFilterOptionsQueryOptions, carsInfiniteQueryOptions } from "@/lib/query/car-queries";
import { makeQueryClient } from "@/lib/query/query-client";
import { parseCarFilters, searchParamsFromRecord } from "@/lib/utils/car-filters";

import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse the RentalCar catalog: filter available cars by brand, price per hour and mileage, then book the one you like.",
  alternates: { canonical: "/catalog" },
};

export default async function CatalogPage({ searchParams }: PageProps<"/catalog">) {
  const filters = parseCarFilters(searchParamsFromRecord(await searchParams));
  const queryClient = makeQueryClient();

  const results = await Promise.allSettled([
    queryClient.infiniteQuery({ ...carsInfiniteQueryOptions(filters), pages: 1 }),
    queryClient.query(carFilterOptionsQueryOptions()),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      logError("Catalog server prefetch failed", result.reason);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
