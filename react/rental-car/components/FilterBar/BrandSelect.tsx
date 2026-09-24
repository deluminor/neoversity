"use client";

import { Select } from "@/components/Select/Select";

import styles from "./BrandSelect.module.css";

interface BrandSelectProps {
  brands: string[] | undefined;
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function BrandSelect({ brands, isLoading, value, onChange }: BrandSelectProps) {
  return (
    <Select
      label="Car brand"
      placeholder="Choose a brand"
      value={value}
      options={brands?.map((brand) => ({ value: brand, label: brand })) ?? []}
      isLoading={isLoading}
      onChange={onChange}
      className={styles.field}
    />
  );
}
