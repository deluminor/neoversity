"use client";

import { sanitizeMileageInput } from "@/lib/utils/mileage";

import styles from "./MileageRange.module.css";

interface MileageRangeProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function MileageRange({ from, to, onFromChange, onToChange }: MileageRangeProps) {
  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>Car mileage / km</legend>
      <div className={styles.inputs}>
        <input
          className={`${styles.input} ${styles.from}`}
          inputMode="numeric"
          autoComplete="off"
          placeholder="From"
          aria-label="Mileage from"
          value={from}
          onChange={(event) => onFromChange(sanitizeMileageInput(event.target.value))}
        />
        <input
          className={`${styles.input} ${styles.to}`}
          inputMode="numeric"
          autoComplete="off"
          placeholder="To"
          aria-label="Mileage to"
          value={to}
          onChange={(event) => onToChange(sanitizeMileageInput(event.target.value))}
        />
      </div>
    </fieldset>
  );
}
