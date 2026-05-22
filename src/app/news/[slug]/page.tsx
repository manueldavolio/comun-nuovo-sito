import { notFound } from "next/navigation";
import { NewsArticleHero } from "@/components/news/NewsArticleHero";
import { NewsGallery } from "@/components/news/NewsGallery";
import { NewsShareButtons } from "@/components/news/NewsShareButtons";
import { NewsSidebar } from "@/components/news/NewsSidebar";
import { publicSiteUrl } from "@/data/site";
import { getNewsBySlug, newsList } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsList.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "News" };
  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <article>
      <NewsArticleHero item={item} />

      <div className="bg-[var(--club-page)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] xl:gap-12">
            <div className="min-w-0">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                <p className="text-lg font-medium leading-relaxed text-slate-800">{item.excerpt}</p>
                <div className="mt-8 space-y-5 border-t border-slate-100 pt-8">
                  {item.content.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-slate-600 sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {item.gallery?.length ? <NewsGallery images={item.gallery} /> : null}

              <NewsShareButtons title={item.title} url={`${publicSiteUrl}/news/${item.slug}`} />
            </div>

            <NewsSidebar excludeSlug={item.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}
