import { ButtonLink } from "@/components/Button/ButtonLink";
import { CarImage } from "@/components/CarImage/CarImage";
import { CAR_CARD_IMAGE_RATIO } from "@/constants/layout";
import { ROUTES } from "@/constants/routes";
import { formatCarTitle, formatMileage, formatPrice } from "@/lib/utils/format";
import type { Car } from "@/types/car";

import styles from "./CarCard.module.css";
import { CarCardMeta } from "./CarCardMeta";

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export function CarCard({ car, priority = false }: CarCardProps) {
  const title = formatCarTitle(car.brand, car.model, car.year);
  const location = [car.location?.city, car.location?.country, car.rentalCompany].filter(
    (value): value is string => Boolean(value),
  );
  const specs = [car.type, formatMileage(car.mileage)];

  return (
    <li className={styles.card}>
      <CarImage
        src={car.img}
        alt={title}
        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 274px"
        ratio={CAR_CARD_IMAGE_RATIO}
        priority={priority}
      />
      <h2 className={styles.header}>
        <span className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model}</span>, {car.year}
        </span>
        <span className={styles.price}>{formatPrice(car.rentalPrice)}</span>
      </h2>
      <CarCardMeta location={location} specs={specs} />
      <ButtonLink
        href={ROUTES.car(car.id)}
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
        className={styles.action}
        aria-label={`Read more about ${title}`}
      >
        Read more
      </ButtonLink>
    </li>
  );
}
