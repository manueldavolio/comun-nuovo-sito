import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatNewsDate } from "@/lib/news-format";
import type { MediaHighlight } from "@/types/site";

type MediaHighlightsProps = {
  items: MediaHighlight[];
};

export function MediaHighlights({ items }: MediaHighlightsProps) {
  const [featured, ...rest] = items;

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
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={featured.image}
                alt=""
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001b3d]/95 via-[#001b3d]/35 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-[#009dff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#001428]">
                {featured.tag}
              </span>
            </div>
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
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900 sm:aspect-auto sm:h-auto sm:w-[42%] sm:min-h-[180px]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, 240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001b3d]/70 to-transparent sm:bg-gradient-to-r" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  {item.tag}
                </span>
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
