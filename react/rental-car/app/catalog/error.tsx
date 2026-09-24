"use client";

import { Container } from "@/components/Container/Container";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { toUserMessage } from "@/lib/api/api-error";

interface CatalogErrorProps {
  error: Error;
  reset: () => void;
}

export default function CatalogError({ error, reset }: CatalogErrorProps) {
  return (
    <Container>
      <ErrorState
        title="Could not load the catalog"
        message={toUserMessage(error)}
        onRetry={reset}
      />
    </Container>
  );
}
