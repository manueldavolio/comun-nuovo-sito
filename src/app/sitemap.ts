import type { MetadataRoute } from "next";
import { baseActivityCategories } from "@/data/base-activities";
import { publicSiteUrl } from "@/data/site";

const staticRoutes = [
  "/",
  "/societa",
  "/prima-squadra",
  "/femminile",
  "/under-19",
  "/under-17",
  "/under-15",
  "/calcio-a-5-c2",
  "/attivita-di-base",
  "/staff",
  "/news",
  "/media",
  "/sponsor",
  "/collaborazioni",
  "/contatti",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = publicSiteUrl.replace(/\/$/, "");

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  for (const category of baseActivityCategories) {
    pages.push({
      url: `${base}/attivita-di-base/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }

  return pages;
}
