"use client";

import { Button } from "@/components/Button/Button";

import styles from "./NotFound.module.css";
import "./globals.css";

interface GlobalErrorProps {
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className={styles.wrapper}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            The application failed to start. Please reload the page and try again.
          </p>
          <div className={styles.actions}>
            <Button onClick={reset}>Try again</Button>
          </div>
        </main>
      </body>
    </html>
  );
}
