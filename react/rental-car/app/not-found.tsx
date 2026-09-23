import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { Container } from "@/components/Container/Container";
import { ROUTES } from "@/constants/routes";

import styles from "./NotFound.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist. Start from the home page or browse the catalog.
      </p>
      <div className={styles.actions}>
        <ButtonLink href={ROUTES.home}>Go home</ButtonLink>
        <ButtonLink href={ROUTES.catalog} variant="outline">
          View catalog
        </ButtonLink>
      </div>
    </Container>
  );
}
