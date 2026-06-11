import Image from "next/image";
import Link from "next/link";
import { categoryToSlug, getFeaturedNews, getLatestNews, getNewsCategoriesWithCount } from "@/data/news";
import { formatNewsDate } from "@/lib/news-format";
import { NEWS_CATEGORIES, type NewsItem } from "@/types/site";

type NewsSidebarProps = {
  activeCategorySlug?: string;
  excludeSlug?: string;
  /** Elenco completo news (CMS + statiche); se omesso usa i dati statici */
  items?: NewsItem[];
};

function SidebarBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.12)]">
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white px-5 py-4">
        <h2 className="font-display text-lg uppercase tracking-wide text-slate-900">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function NewsSidebar({ activeCategorySlug, excludeSlug, items }: NewsSidebarProps) {
  const sorted = items ? [...items].sort((a, b) => b.date.localeCompare(a.date)) : null;

  const latest = sorted
    ? sorted.filter((n) => n.slug !== excludeSlug).slice(0, 4)
    : getLatestNews(4, excludeSlug);
  const featured = sorted
    ? sorted.filter((n) => n.featured && n.slug !== excludeSlug).slice(0, 2)
    : getFeaturedNews(2).filter((n) => n.slug !== excludeSlug);
  const categories = sorted
    ? NEWS_CATEGORIES.map((category) => ({
        category,
        slug: categoryToSlug(category),
        count: sorted.filter((n) => n.category === category).length,
      }))
    : getNewsCategoriesWithCount();

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <SidebarBlock title="Ultime news">
        {latest.length === 0 ? (
          <p className="text-sm leading-relaxed text-slate-600">
            Le news ufficiali verranno pubblicate a breve.
          </p>
        ) : (
        <ul className="space-y-4">
          {latest.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/news/${item.slug}`}
                className="group flex gap-3 rounded-xl p-1 transition hover:bg-sky-50/80"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                    {item.category}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 group-hover:text-sky-800">
                    {item.title}
                  </p>
                  <time
                    dateTime={item.date}
                    className="mt-1 block text-[11px] text-slate-500"
                  >
                    {formatNewsDate(item.date, "short")}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        )}
      </SidebarBlock>

      <SidebarBlock title="Categorie">
        <ul className="space-y-1">
          <li>
            <Link
              href="/news"
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                !activeCategorySlug
                  ? "bg-sky-600 text-white"
                  : "text-slate-700 hover:bg-sky-50 hover:text-sky-800"
              }`}
            >
              Tutte
            </Link>
          </li>
          {categories.map(({ category, count, slug }) => (
            <li key={slug}>
              <Link
                href={`/news?categoria=${slug}`}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  activeCategorySlug === slug
                    ? "bg-sky-600 text-white"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-800"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    activeCategorySlug === slug
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </SidebarBlock>

      {featured.length > 0 ? (
        <SidebarBlock title="In evidenza">
          <ul className="space-y-4">
            {featured.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/news/${item.slug}`}
                  className="group block overflow-hidden rounded-xl border border-slate-200/80 transition hover:border-sky-300 hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] bg-slate-200">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="320px"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#007BFF] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 font-display text-base uppercase leading-tight tracking-wide text-slate-900 group-hover:text-sky-800">
                      {item.title}
                    </p>
                    <time
                      dateTime={item.date}
                      className="mt-2 block text-[11px] font-medium text-slate-500"
                    >
                      {formatNewsDate(item.date, "short")}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarBlock>
      ) : null}
    </aside>
  );
}
