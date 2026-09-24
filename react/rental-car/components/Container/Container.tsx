import type { ReactNode } from "react";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  const classNames = className ? `${styles.container} ${className}` : styles.container;
  return <div className={classNames}>{children}</div>;
}
