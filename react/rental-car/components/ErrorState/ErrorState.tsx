import { FiAlertCircle } from "react-icons/fi";

import { Button } from "@/components/Button/Button";

import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.wrapper}>
      <FiAlertCircle size={48} className={styles.icon} aria-hidden="true" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
