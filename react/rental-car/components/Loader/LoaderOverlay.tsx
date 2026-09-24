import { LoaderCard } from "./LoaderCard";
import styles from "./Loader.module.css";

interface LoaderOverlayProps {
  title: string;
  description: string;
}

export function LoaderOverlay({ title, description }: LoaderOverlayProps) {
  return (
    <div className={styles.overlay}>
      <LoaderCard title={title} description={description} />
    </div>
  );
}
