import { FiCheckCircle } from "react-icons/fi";

import styles from "./CarDetails.module.css";
import { IconList } from "./IconList";

interface CarFeaturesProps {
  features: string[];
}

export function CarFeatures({ features }: CarFeaturesProps) {
  if (features.length === 0) return null;

  const items = features.map((feature) => ({
    id: feature,
    icon: <FiCheckCircle size={16} />,
    text: feature,
  }));

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Features</h2>
      <IconList items={items} />
    </section>
  );
}
