import { ButtonLink } from "@/components/Button/ButtonLink";
import { Container } from "@/components/Container/Container";
import { ROUTES } from "@/constants/routes";

import styles from "@/app/NotFound.module.css";

export default function CarNotFound() {
  return (
    <Container className={styles.wrapper}>
      <h1 className={styles.title}>Car not found</h1>
      <p className={styles.message}>
        This car is no longer available. Browse the catalog to find another one.
      </p>
      <ButtonLink href={ROUTES.catalog} variant="outline">
        Back to catalog
      </ButtonLink>
    </Container>
  );
}
