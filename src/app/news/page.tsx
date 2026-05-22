import { NewsGrid } from "@/components/news/NewsGrid";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsSidebar } from "@/components/news/NewsSidebar";
import { getAllNews, slugToCategory } from "@/data/news";
import type { NewsCategory } from "@/types/site";

export const metadata = {
  title: "News",
  description:
    "Ultime news dal mondo biancoazzurro: prima squadra, femminile, settore giovanile, eventi e società.",
};

type NewsPageProps = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { categoria } = await searchParams;
  const categoryFilter: NewsCategory | undefined = categoria ? slugToCategory(categoria) : undefined;

  const items = categoryFilter
    ? getAllNews().filter((n) => n.category === categoryFilter)
    : getAllNews();

  return (
    <div>
      <NewsHero />

      <div className="bg-[var(--club-page)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {categoryFilter ? (
            <p className="mb-8 text-sm text-slate-600">
              Filtro attivo:{" "}
              <span className="font-semibold text-slate-900">{categoryFilter}</span>
            </p>
          ) : null}

          <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] xl:gap-12">
            <NewsGrid items={items} categoryFilter={categoria} />
            <NewsSidebar activeCategorySlug={categoria} />
          </div>
        </div>
      </div>
    </div>
  );
}
