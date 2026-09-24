import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}${ROUTES.home}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${ROUTES.catalog}`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
