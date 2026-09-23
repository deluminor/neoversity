import type { Car } from "@/types/car";

import { CarConditions } from "./CarConditions";
import styles from "./CarDetails.module.css";
import { CarFeatures } from "./CarFeatures";
import { CarSpecifications } from "./CarSpecifications";
import { CarSummary } from "./CarSummary";

interface CarDetailsCardProps {
  car: Car;
}

export function CarDetailsCard({ car }: CarDetailsCardProps) {
  return (
    <div className={styles.card}>
      <CarSummary car={car} />
      <CarConditions conditions={car.rentalConditions} />
      <CarSpecifications car={car} />
      <CarFeatures features={car.features} />
    </div>
  );
}
