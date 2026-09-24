import type { InputHTMLAttributes, Ref } from "react";

import { FiAlertCircle } from "react-icons/fi";

import styles from "./TextField.module.css";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export function TextField({ id, label, error, className, ...rest }: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <div className={styles.control}>
        <input
          id={id}
          className={[styles.input, error ? styles.invalid : null, className]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        <label
          htmlFor={id}
          className={error ? `${styles.label} ${styles.labelError}` : styles.label}
        >
          {label}
        </label>
        {error ? <FiAlertCircle size={16} className={styles.icon} aria-hidden="true" /> : null}
      </div>
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
