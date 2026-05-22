import type { NewsCategory, NewsItem } from "@/types/site";
import { NEWS_CATEGORIES } from "@/types/site";

/** Elenco statico — sostituibile con fetch CMS / database */
export const newsList: NewsItem[] = [];

const categorySlugMap: Record<string, NewsCategory> = {
  "prima-squadra": "Prima Squadra",
  femminile: "Femminile",
  "attivita-di-base": "Attività di Base",
  eventi: "Eventi",
  societa: "Società",
};

export function categoryToSlug(category: NewsCategory): string {
  const entry = Object.entries(categorySlugMap).find(([, c]) => c === category);
  return entry?.[0] ?? category.toLowerCase().replace(/\s+/g, "-");
}

export function slugToCategory(slug: string): NewsCategory | undefined {
  return categorySlugMap[slug];
}

export function getAllNews(): NewsItem[] {
  return [...newsList].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsList.find((n) => n.slug === slug);
}

export function getFeaturedNews(limit = 3): NewsItem[] {
  return getAllNews()
    .filter((n) => n.featured)
    .slice(0, limit);
}

export function getLatestNews(limit = 5, excludeSlug?: string): NewsItem[] {
  return getAllNews()
    .filter((n) => n.slug !== excludeSlug)
    .slice(0, limit);
}

export function getNewsByCategory(category: NewsCategory): NewsItem[] {
  return getAllNews().filter((n) => n.category === category);
}

export function getNewsCategoriesWithCount(): { category: NewsCategory; count: number; slug: string }[] {
  return NEWS_CATEGORIES.map((category) => ({
    category,
    slug: categoryToSlug(category),
    count: newsList.filter((n) => n.category === category).length,
  }));
}
