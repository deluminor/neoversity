"use client";

import { Container } from "@/components/Container/Container";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { toUserMessage } from "@/lib/api/api-error";

interface RootErrorProps {
  error: Error;
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <Container>
      <ErrorState message={toUserMessage(error)} onRetry={reset} />
    </Container>
  );
}
