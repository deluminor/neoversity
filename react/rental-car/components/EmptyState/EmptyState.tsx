import Image from "next/image";

import { Button } from "@/components/Button/Button";
import { NO_CARS_IMAGE } from "@/constants/assets";

import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      <Image
        src={NO_CARS_IMAGE}
        alt="Magnifier searching for a car"
        width={480}
        height={360}
        className={styles.illustration}
      />
      <h2 className={styles.title}>No cars found</h2>
      <p className={styles.description}>
        We couldn’t find any cars that match your current filters. Try changing your search criteria
        or reset the filters.
      </p>
      <Button variant="outline" className={styles.action} onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}
