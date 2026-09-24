import type { ButtonHTMLAttributes } from "react";

import { buttonClassName, type ButtonVariant } from "./button-styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClassName({ variant, fullWidth, className })} {...rest} />
  );
}
