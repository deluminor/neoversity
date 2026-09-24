import { CarCard } from "@/components/CarCard/CarCard";
import { PER_PAGE } from "@/constants/pagination";
import type { Car } from "@/types/car";

import styles from "./CarGrid.module.css";

interface CarGridProps {
  cars: Car[];
}

export function CarGrid({ cars }: CarGridProps) {
  return (
    <ul className={styles.grid}>
      {cars.map((car, index) => (
        <CarCard key={car.id} car={car} priority={index < PER_PAGE / 3} />
      ))}
    </ul>
  );
}
