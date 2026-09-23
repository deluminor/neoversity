"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import styles from "./NavLink.module.css";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? `${styles.link} ${styles.active}` : styles.link}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
