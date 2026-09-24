import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonClassName, type ButtonVariant } from "./button-styles";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export function ButtonLink({
  variant = "primary",
  fullWidth = false,
  className,
  ...rest
}: ButtonLinkProps) {
  return <Link className={buttonClassName({ variant, fullWidth, className })} {...rest} />;
}
