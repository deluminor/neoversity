const isBrowser = typeof window !== "undefined";
const isProduction = process.env.NODE_ENV === "production";

export function logError(message: string, cause: unknown): void {
  if (isBrowser && isProduction) return;
  console.error(message, cause);
}
