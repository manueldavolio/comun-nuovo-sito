import Link from "next/link";
import { NewsCard } from "@/components/news/NewsCard";
import type { NewsItem } from "@/types/site";

type NewsGridProps = {
  items: NewsItem[];
};

export function NewsGrid({ items }: NewsGridProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-600">
        Nessuna news in questa categoria.{" "}
        <Link href="/news" className="font-semibold text-sky-700 hover:text-sky-900">
          Vedi tutte le news
        </Link>
      </p>
    );
  }

  const [lead, ...rest] = items;
  const showLeadFeatured = lead.featured;

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
      <NewsCard item={lead} featured={showLeadFeatured} />
      {rest.map((item) => (
        <NewsCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
