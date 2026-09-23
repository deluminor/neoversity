import { BsCarFront, BsFuelPump } from "react-icons/bs";
import { FiCalendar, FiSettings } from "react-icons/fi";
import { TbRoad } from "react-icons/tb";
import { formatMileage } from "@/lib/utils/format";
import type { Car } from "@/types/car";

import styles from "./CarDetails.module.css";
import { IconList, type IconListItem } from "./IconList";

interface CarSpecificationsProps {
  car: Car;
}

export function CarSpecifications({ car }: CarSpecificationsProps) {
  const items: IconListItem[] = [
    { id: "year", icon: <FiCalendar size={16} />, text: `Year: ${car.year}` },
    { id: "type", icon: <BsCarFront size={16} />, text: `Type: ${car.type}` },
  ];

  if (car.fuelConsumption !== undefined) {
    items.push({
      id: "fuel",
      icon: <BsFuelPump size={16} />,
      text: `Fuel Consumption: ${car.fuelConsumption}`,
    });
  }

  if (car.engine) {
    items.push({ id: "engine", icon: <FiSettings size={16} />, text: `Engine: ${car.engine}` });
  }

  items.push({
    id: "mileage",
    icon: <TbRoad size={16} />,
    text: `Mileage: ${formatMileage(car.mileage)}`,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Car Specifications:</h2>
      <IconList items={items} />
    </section>
  );
}
