import type { ReactNode } from "react";

import styles from "./CarDetails.module.css";

export interface IconListItem {
  id: string;
  icon: ReactNode;
  text: string;
}

interface IconListProps {
  items: IconListItem[];
}

export function IconList({ items }: IconListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <span className={styles.itemIcon} aria-hidden="true">
            {item.icon}
          </span>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
