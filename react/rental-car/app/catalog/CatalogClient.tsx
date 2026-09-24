"use client";

import { useSearchParams } from "next/navigation";

import { CarGrid } from "@/components/CarGrid/CarGrid";
import { Container } from "@/components/Container/Container";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { FilterBar } from "@/components/FilterBar/FilterBar";
import { LoadMoreButton } from "@/components/LoadMoreButton/LoadMoreButton";
import { LoaderOverlay } from "@/components/Loader/LoaderOverlay";
import { CATALOG_LOADING } from "@/constants/loading";
import { useCarFilters } from "@/hooks/use-car-filters";
import { useCarsInfiniteQuery } from "@/hooks/use-cars-infinite-query";
import { toUserMessage } from "@/lib/api/api-error";
import { parseCarFilters } from "@/lib/utils/car-filters";

import styles from "./Catalog.module.css";

export function CatalogClient() {
  const searchParams = useSearchParams();
  const filters = parseCarFilters(searchParams);
  const { draft, isDirty, isPendingNav, setField, search, reset } = useCarFilters(filters);

  const {
    cars,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useCarsInfiniteQuery(filters);

  const renderContent = () => {
    if (isError) {
      return <ErrorState message={toUserMessage(error)} onRetry={() => void refetch()} />;
    }

    if (!isPending && cars.length === 0) {
      return <EmptyState onReset={reset} />;
    }

    return (
      <>
        <div className={styles.grid}>
          <CarGrid cars={cars} />
        </div>
        {hasNextPage ? (
          <LoadMoreButton isLoading={isFetchingNextPage} onClick={() => void fetchNextPage()} />
        ) : null}
      </>
    );
  };

  return (
    <Container className={styles.page}>
      <h1 className={styles.heading}>Car catalog</h1>
      <FilterBar
        draft={draft}
        isDirty={isDirty}
        onFieldChange={setField}
        onSearch={search}
        onReset={reset}
      />
      <div className={styles.results}>
        {isPending || isPendingNav ? (
          <LoaderOverlay title={CATALOG_LOADING.title} description={CATALOG_LOADING.description} />
        ) : null}

        {renderContent()}
      </div>
    </Container>
  );
}
