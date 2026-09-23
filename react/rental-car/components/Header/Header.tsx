import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { NavLink } from "@/components/NavLink/NavLink";
import { NAV_LINKS } from "@/constants/navigation";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />
        <nav aria-label="Main navigation">
          <ul className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
