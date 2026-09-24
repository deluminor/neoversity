import { LoaderCard } from "./LoaderCard";
import styles from "./Loader.module.css";

interface LoaderPanelProps {
  title: string;
  description: string;
}

export function LoaderPanel({ title, description }: LoaderPanelProps) {
  return (
    <div className={styles.panel}>
      <LoaderCard title={title} description={description} />
    </div>
  );
}
