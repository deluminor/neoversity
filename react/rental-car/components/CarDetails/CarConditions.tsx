import { FiCheckCircle } from "react-icons/fi";

import styles from "./CarDetails.module.css";
import { IconList } from "./IconList";

interface CarConditionsProps {
  conditions: string[];
}

export function CarConditions({ conditions }: CarConditionsProps) {
  if (conditions.length === 0) return null;

  const items = conditions.map((condition) => ({
    id: condition,
    icon: <FiCheckCircle size={16} />,
    text: condition,
  }));

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
      <IconList items={items} />
    </section>
  );
}
