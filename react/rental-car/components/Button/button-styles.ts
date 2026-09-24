import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}

export function buttonClassName({
  variant = "primary",
  fullWidth = false,
  className,
}: ButtonStyleOptions): string {
  return [styles.button, styles[variant], fullWidth ? styles.wide : null, className]
    .filter(Boolean)
    .join(" ");
}
