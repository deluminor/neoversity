"use client";

import { Container } from "@/components/Container/Container";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { toUserMessage } from "@/lib/api/api-error";

interface CarDetailsErrorProps {
  error: Error;
  reset: () => void;
}

export default function CarDetailsError({ error, reset }: CarDetailsErrorProps) {
  return (
    <Container>
      <ErrorState title="Could not load this car" message={toUserMessage(error)} onRetry={reset} />
    </Container>
  );
}
