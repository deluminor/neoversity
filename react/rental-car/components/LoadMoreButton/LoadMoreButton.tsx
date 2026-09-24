import { Button } from "@/components/Button/Button";
import { Loader } from "@/components/Loader/Loader";

import styles from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function LoadMoreButton({ isLoading, onClick }: LoadMoreButtonProps) {
  return (
    <div className={styles.wrapper}>
      <Button
        variant="outline"
        className={styles.button}
        onClick={onClick}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? <Loader size={20} thickness={2} /> : null}
        Load more
      </Button>
    </div>
  );
}
