import Image from "next/image";
import Link from "next/link";
import { ClubButton } from "@/components/ui/ClubButton";
import { formatNewsDate } from "@/lib/news-format";
import type { NewsItem } from "@/types/site";

type NewsCardProps = {
  item: NewsItem;
  featured?: boolean;
};

export function NewsCard({ item, featured }: NewsCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:border-sky-300/60 hover:shadow-[0_32px_64px_-28px_rgba(0,123,255,0.22)] ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
    >
      <Link
        href={`/news/${item.slug}`}
        className={`relative block shrink-0 overflow-hidden bg-slate-900 ${
          featured
            ? "aspect-[16/10] w-full lg:aspect-auto lg:h-auto lg:min-h-[280px] lg:w-[52%]"
            : "aspect-[16/10] w-full"
        }`}
      >
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b3d]/75 via-[#001b3d]/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[#009dff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#001428] shadow-lg shadow-sky-900/30">
          {item.category}
        </span>
        {item.featured ? (
          <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            In evidenza
          </span>
        ) : null}
      </Link>

      <div
        className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "lg:justify-center lg:p-8 lg:pl-8" : ""}`}
      >
        <time
          dateTime={item.date}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600"
        >
          {formatNewsDate(item.date)}
        </time>
        <h2
          className={`mt-3 font-display uppercase leading-[0.98] tracking-[0.02em] text-slate-900 ${
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          <Link href={`/news/${item.slug}`} className="hover:text-sky-700">
            {item.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
          {item.excerpt}
        </p>
        <div className="mt-6">
          <ClubButton href={`/news/${item.slug}`} variant="outlineLight" className="w-full sm:w-auto">
            Leggi di più
          </ClubButton>
        </div>
      </div>
    </article>
  );
}
