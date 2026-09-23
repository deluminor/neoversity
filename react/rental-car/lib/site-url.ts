import { readUrl } from "./env";

const DEFAULT_SITE_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return productionUrl ? `https://${productionUrl}` : DEFAULT_SITE_URL;
}

export const SITE_URL = readUrl("SITE_URL", resolveSiteUrl(), DEFAULT_SITE_URL);
