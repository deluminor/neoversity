import { FiMapPin } from "react-icons/fi";

import { formatCarTitle, formatLocation, formatPrice } from "@/lib/utils/format";
import type { Car } from "@/types/car";

import styles from "./CarDetails.module.css";

interface CarSummaryProps {
  car: Car;
}

export function CarSummary({ car }: CarSummaryProps) {
  const location = formatLocation(car.location);

  return (
    <div className={styles.summary}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{formatCarTitle(car.brand, car.model, car.year)}</h1>
        {car.stockNumber === undefined ? null : (
          <p className={styles.article}>Article: {car.stockNumber}</p>
        )}
      </div>
      {location ? (
        <p className={styles.location}>
          <FiMapPin size={16} aria-hidden="true" />
          {location}
        </p>
      ) : null}
      <p className={styles.price}>{formatPrice(car.rentalPrice)}</p>
      {car.description ? <p className={styles.description}>{car.description}</p> : null}
    </div>
  );
}
