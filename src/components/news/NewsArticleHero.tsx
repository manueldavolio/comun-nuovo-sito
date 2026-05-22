import Image from "next/image";
import Link from "next/link";
import { formatNewsDate } from "@/lib/news-format";
import type { NewsItem } from "@/types/site";

type NewsArticleHeroProps = {
  item: NewsItem;
};

export function NewsArticleHero({ item }: NewsArticleHeroProps) {
  return (
    <header className="relative isolate min-h-[min(420px,70vw)] overflow-hidden bg-[#001b3d] sm:min-h-[480px] lg:min-h-[520px]">
      <Image
        src={item.image}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#001b3d]/55" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b3d] via-[#001b3d]/40 to-[#001b3d]/20" />
      <div className="pointer-events-none absolute inset-0 hero-home-diagonals opacity-20" aria-hidden />

      <div className="relative mx-auto flex min-h-[min(420px,70vw)] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[480px] sm:px-6 sm:pb-14 lg:min-h-[520px] lg:px-8">
        <Link
          href="/news"
          className="mb-6 inline-flex w-fit items-center gap-1 text-sm font-semibold text-sky-200 transition hover:text-white"
        >
          <span aria-hidden>←</span> Torna alle news
        </Link>
        <span className="inline-flex w-fit rounded-full bg-[#009dff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#001428]">
          {item.category}
        </span>
        <time
          dateTime={item.date}
          className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-sky-200"
        >
          {formatNewsDate(item.date)}
        </time>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2rem,5.5vw,3.5rem)] uppercase leading-[0.95] tracking-[0.02em] text-white">
          {item.title}
        </h1>
      </div>
    </header>
  );
}
