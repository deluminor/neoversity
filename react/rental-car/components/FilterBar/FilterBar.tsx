"use client";

import { Button } from "@/components/Button/Button";
import { BrandSelect } from "@/components/FilterBar/BrandSelect";
import { MileageRange } from "@/components/FilterBar/MileageRange";
import { PriceSelect } from "@/components/FilterBar/PriceSelect";
import { useCarFilterOptions } from "@/hooks/use-car-filter-options";
import type { CarFiltersDraft } from "@/types/filters";

import styles from "./FilterBar.module.css";

interface FilterBarProps {
  draft: CarFiltersDraft;
  isDirty: boolean;
  onFieldChange: <TField extends keyof CarFiltersDraft>(
    field: TField,
    value: CarFiltersDraft[TField],
  ) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function FilterBar({ draft, isDirty, onFieldChange, onSearch, onReset }: FilterBarProps) {
  const { data: filterOptions, isPending, isError, refetch } = useCarFilterOptions();

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
      >
        <BrandSelect
          brands={filterOptions?.brands}
          isLoading={isPending}
          value={draft.brand}
          onChange={(value) => onFieldChange("brand", value)}
        />
        <PriceSelect
          range={filterOptions?.price}
          isLoading={isPending}
          value={draft.price}
          onChange={(value) => onFieldChange("price", value)}
        />
        <MileageRange
          from={draft.minMileage}
          to={draft.maxMileage}
          onFromChange={(value) => onFieldChange("minMileage", value)}
          onToChange={(value) => onFieldChange("maxMileage", value)}
        />
        <div className={styles.actions}>
          <span className={styles.spacerLabel} aria-hidden="true">
            &nbsp;
          </span>
          <Button type="submit" className={styles.search}>
            Search
          </Button>
          <Button variant="ghost" className={styles.reset} onClick={onReset} disabled={!isDirty}>
            Clear filters
          </Button>
        </div>
      </form>
      {isError ? (
        <p className={styles.error} role="alert">
          Brand and price options could not be loaded.{" "}
          <button type="button" className={styles.retry} onClick={() => void refetch()}>
            Try again
          </button>
        </p>
      ) : null}
    </div>
  );
}
