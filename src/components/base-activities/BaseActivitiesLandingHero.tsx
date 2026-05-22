import Image from "next/image";
import Link from "next/link";
import { baseActivitiesLandingHero } from "@/data/base-activities";
import { gestionaleUrl } from "@/data/site";

export function BaseActivitiesLandingHero() {
  const { eyebrow, title, subtitle, image, imageAlt } = baseActivitiesLandingHero;

  return (
    <section
      className="relative isolate min-h-[min(92vh,720px)] overflow-hidden bg-[#001b3d] text-white"
      aria-labelledby="base-landing-hero-title"
    >
      <div className="pointer-events-none absolute inset-0 hero-home-dots opacity-[0.22]" aria-hidden />
      <div
        className="hero-home-diagonals-soft pointer-events-none absolute inset-y-0 right-0 w-[min(100%,640px)] opacity-35"
        aria-hidden
      />
      <div
        className="hero-home-diagonals pointer-events-none absolute inset-y-0 right-0 w-[min(100%,520px)] opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-[420px] w-[420px] rounded-full bg-[#009dff]/25 blur-[100px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] w-full max-w-[80rem] flex-col px-4 py-10 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:gap-10 lg:py-16 xl:px-8">
        <div className="flex flex-1 flex-col justify-center lg:max-w-[min(100%,520px)] lg:py-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7dd3fc]">{eyebrow}</p>
          <h1
            id="base-landing-hero-title"
            className="mt-3 font-display text-[clamp(2.5rem,7vw,4.25rem)] uppercase leading-[0.92] tracking-[0.02em] text-white"
          >
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88 sm:text-lg sm:leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#009dff] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#001428] shadow-[0_8px_28px_-6px_rgba(0,157,255,0.65)] transition hover:bg-[#33b0ff] sm:text-[11px]"
            >
              Richiedi informazioni
              <span aria-hidden className="text-sm font-black">
                ›
              </span>
            </Link>
            <Link
              href={gestionaleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border-2 border-white/90 bg-transparent px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10 sm:text-[11px]"
            >
              Iscriviti ora
              <span aria-hidden className="text-sm font-black">
                ›
              </span>
            </Link>
          </div>
        </div>

        <div className="relative mt-8 h-[min(280px,42vw)] min-h-[220px] w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 lg:mt-0 lg:h-[min(480px,58vh)] lg:flex-1 lg:min-h-[360px] lg:rounded-3xl">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 48vw"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b3d]/75 via-[#001b3d]/15 to-transparent lg:bg-gradient-to-l lg:from-[#001b3d]/55 lg:via-transparent lg:to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_40%,rgba(0,157,255,0.35)_0%,transparent_65%)] mix-blend-soft-light"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
