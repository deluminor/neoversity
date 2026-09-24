import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
  thickness?: number;
}

export function Loader({ size = 48, thickness = 4 }: LoaderProps) {
  return (
    <span
      className={styles.spinner}
      style={{ width: size, height: size, borderWidth: thickness }}
      aria-hidden="true"
    />
  );
}
