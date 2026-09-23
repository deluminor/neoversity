"use client";

import { Select } from "@/components/Select/Select";
import { PRICE_STEP } from "@/constants/filters";
import type { CarPriceRange } from "@/types/filters";

import styles from "./PriceSelect.module.css";

interface PriceSelectProps {
  range: CarPriceRange | undefined;
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

function buildPriceOptions(range: CarPriceRange | undefined, selected: string) {
  const values: number[] = [];

  if (range) {
    for (let price = range.min; price <= range.max; price += PRICE_STEP) {
      values.push(price);
    }
  }

  const selectedPrice = Number(selected);

  if (selected !== "" && Number.isFinite(selectedPrice) && !values.includes(selectedPrice)) {
    values.push(selectedPrice);
    values.sort((first, second) => first - second);
  }

  return values.map((price) => ({ value: String(price), label: String(price) }));
}

export function PriceSelect({ range, isLoading, value, onChange }: PriceSelectProps) {
  return (
    <Select
      label="Price/ 1 hour"
      placeholder="Choose a price"
      value={value}
      options={buildPriceOptions(range, value)}
      isLoading={isLoading}
      onChange={onChange}
      renderValue={(option) => `To $${option.label}`}
      className={styles.field}
    />
  );
}
