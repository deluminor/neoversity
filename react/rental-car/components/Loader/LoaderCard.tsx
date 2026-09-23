import { Loader } from "./Loader";
import styles from "./Loader.module.css";

interface LoaderCardProps {
  title: string;
  description: string;
}

export function LoaderCard({ title, description }: LoaderCardProps) {
  return (
    <div className={styles.card} role="status" aria-live="polite" aria-busy="true">
      <Loader size={72} />
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
