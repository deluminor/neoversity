import { z } from "zod";

const DEFAULT_API_BASE_URL = "https://car-rental-api.goit.study";

const UrlSchema = z.url();

export function readUrl(name: string, value: string | undefined, fallback: string): string {
  const candidate = value?.trim() || fallback;
  const result = UrlSchema.safeParse(candidate);

  if (!result.success) {
    throw new Error(`Invalid ${name}: expected an absolute URL, received "${candidate}".`);
  }

  return result.data.replace(/\/$/, "");
}

export const API_BASE_URL = readUrl(
  "NEXT_PUBLIC_API_BASE_URL",
  process.env.NEXT_PUBLIC_API_BASE_URL,
  DEFAULT_API_BASE_URL,
);
