import styles from "./CarCardMeta.module.css";

interface CarCardMetaProps {
  location: string[];
  specs: string[];
}

export function CarCardMeta({ location, specs }: CarCardMetaProps) {
  const rows = [
    { id: "location", items: location },
    { id: "specs", items: specs },
  ];

  return (
    <ul className={styles.meta}>
      {rows.map((row) => (
        <li key={row.id} className={styles.row}>
          {row.items.map((item) => (
            <span key={`${row.id}-${item}`} className={styles.item}>
              {item}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
