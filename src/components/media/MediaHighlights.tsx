import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatNewsDate } from "@/lib/news-format";
import type { MediaHighlight } from "@/types/site";

type MediaHighlightsProps = {
  items: MediaHighlight[];
};

function MediaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 8.5A2.5 2.5 0 0 1 6.5 6h5.2l1.4-2h3.4l1.4 2h.6A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-12A2.5 2.5 0 0 1 4 16.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m17 11 3-1.8v6.6L17 14v-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MediaPreview({ item, featured = false }: { item: MediaHighlight; featured?: boolean }) {
  const aspectClass = featured
    ? "aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px]"
    : "aspect-[16/10] sm:aspect-auto sm:h-auto sm:min-h-[180px]";

  return (
    <div className={`relative w-full overflow-hidden bg-slate-900 ${aspectClass}`}>
      {item.image ? (
        <Image
          src={item.image}
          alt=""
          fill
          className={`object-cover transition ${featured ? "duration-700 group-hover:scale-[1.04]" : "duration-500 group-hover:scale-[1.05]"}`}
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 240px"}
          unoptimized={item.image.startsWith("http")}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,157,255,0.34),transparent_32%),linear-gradient(135deg,#001b3d,#003f8f)] text-white/90">
          <MediaIcon className={featured ? "h-20 w-20" : "h-12 w-12"} />
        </div>
      )}
      <div className={featured ? "absolute inset-0 bg-gradient-to-t from-[#001b3d]/95 via-[#001b3d]/35 to-transparent" : "absolute inset-0 bg-gradient-to-t from-[#001b3d]/70 to-transparent sm:bg-gradient-to-r"} />
      <span
        className={
          featured
            ? "absolute left-5 top-5 rounded-full bg-[#009dff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#001428]"
            : "absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
        }
      >
        {item.tag}
      </span>
    </div>
  );
}

export function MediaHighlights({ items }: MediaHighlightsProps) {
  const [featured, ...rest] = items;

  if (!featured) {
    return (
      <section className="scroll-mt-24" id="highlights">
        <SectionHeading
          align="center"
          eyebrow="Media"
          title="Highlights in aggiornamento"
          subtitle="Stiamo preparando contenuti, foto e video delle nostre squadre. Torna presto per scoprire highlights, interviste, gallery e momenti più belli della stagione biancoazzurra."
        />

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-sky-200/70 bg-white shadow-[0_28px_70px_-36px_rgba(15,23,42,0.28)]">
          <div className="relative p-8 text-center sm:p-10">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,157,255,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,249,255,0.92))]"
              aria-hidden
            />
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#001b3d] text-[#7dd3fc] shadow-[0_18px_40px_-20px_rgba(0,27,61,0.75)]">
              <MediaIcon className="h-10 w-10" />
            </div>
            <p className="relative mt-6 text-sm font-bold uppercase tracking-[0.22em] text-[#003f8f]">
              Foto e video
            </p>
            <p className="relative mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Nuovi contenuti ufficiali saranno pubblicati appena disponibili dal CMS.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="scroll-mt-24" id="highlights">
      <SectionHeading
        eyebrow="Settimana"
        title="Highlights della settimana"
        subtitle="Le storie più calde dal mondo biancoazzurro."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {featured ? (
          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_28px_70px_-36px_rgba(15,23,42,0.22)] lg:row-span-2">
            <MediaPreview item={featured} featured />
            <div className="p-6 sm:p-8">
              {featured.date ? (
                <time
                  dateTime={featured.date}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600"
                >
                  {formatNewsDate(featured.date)}
                </time>
              ) : null}
              <h3 className="mt-2 font-display text-2xl uppercase leading-[0.98] tracking-wide text-slate-900 sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{featured.subtitle}</p>
            </div>
          </article>
        ) : null}

        <div className="flex flex-col gap-6">
          {rest.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/60 hover:shadow-[0_28px_56px_-24px_rgba(0,157,255,0.2)] sm:flex-row"
            >
              <div className="w-full shrink-0 sm:w-[42%]">
                <MediaPreview item={item} />
              </div>
              <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                {item.date ? (
                  <time
                    dateTime={item.date}
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-600"
                  >
                    {formatNewsDate(item.date)}
                  </time>
                ) : null}
                <h3 className="mt-1.5 font-display text-xl uppercase leading-tight tracking-wide text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
