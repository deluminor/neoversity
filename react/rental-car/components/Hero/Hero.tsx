import Image from "next/image";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { Container } from "@/components/Container/Container";
import { HERO_IMAGE } from "@/constants/assets";
import { ROUTES } from "@/constants/routes";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src={HERO_IMAGE}
        alt="Sports car driving along a sunlit highway"
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <span className={styles.overlay} aria-hidden="true" />
      <Container className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>Reliable and budget-friendly rentals for any journey</p>
        <ButtonLink href={ROUTES.catalog} className={styles.action}>
          View Catalog
        </ButtonLink>
      </Container>
    </section>
  );
}
