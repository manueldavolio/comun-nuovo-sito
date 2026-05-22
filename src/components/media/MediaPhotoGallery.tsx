"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GalleryImage, MediaGallerySection } from "@/types/site";

type MediaPhotoGalleryProps = {
  sections: MediaGallerySection[];
};

type LightboxImage = GalleryImage & { sectionTitle: string };

function spanClass(span: GalleryImage["span"]) {
  switch (span) {
    case "wide":
      return "sm:col-span-2";
    case "tall":
      return "sm:row-span-2";
    default:
      return "";
  }
}

function aspectClass(span: GalleryImage["span"]) {
  switch (span) {
    case "wide":
      return "aspect-[16/10] sm:aspect-auto sm:min-h-[220px]";
    case "tall":
      return "aspect-[3/4] sm:aspect-auto sm:min-h-[280px]";
    default:
      return "aspect-[4/3]";
  }
}

export function MediaPhotoGallery({ sections }: MediaPhotoGalleryProps) {
  const flatImages = useMemo<LightboxImage[]>(
    () =>
      sections.flatMap((section) =>
        section.images.map((img) => ({ ...img, sectionTitle: section.title })),
      ),
    [sections],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? flatImages[activeIndex] : null;

  const open = useCallback(
    (id: string) => {
      const index = flatImages.findIndex((img) => img.id === id);
      if (index >= 0) setActiveIndex(index);
    },
    [flatImages],
  );

  const close = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === null || i <= 0 ? flatImages.length - 1 : i - 1));
  }, [flatImages.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null || i >= flatImages.length - 1 ? 0 : i + 1));
  }, [flatImages.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, goNext, goPrev]);

  return (
    <section className="scroll-mt-24" id="gallery-foto" aria-labelledby="gallery-foto-heading">
      <SectionHeading
        eyebrow="Gallery"
        title="Gallery foto"
        subtitle="Momenti dal campo, dagli spogliatoi e dagli eventi del club."
      />

      <div className="mt-14 space-y-16">
        {sections.map((section) => (
          <div key={section.id}>
            <h3 className="flex items-center gap-3 font-display text-2xl uppercase tracking-wide text-slate-900 sm:text-3xl">
              <span className="h-px max-w-12 flex-1 bg-gradient-to-r from-[#009dff] to-transparent" aria-hidden />
              {section.title}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[minmax(160px,auto)] lg:grid-cols-3 lg:gap-4">
              {section.images.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => open(img.id)}
                  className={`group relative cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.2)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/70 hover:shadow-[0_28px_56px_-24px_rgba(0,157,255,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009dff] ${spanClass(img.span)} ${aspectClass(img.span)}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b3d]/80 via-[#001b3d]/10 to-transparent opacity-70 transition group-hover:opacity-90"
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {section.title}
                  </span>
                  <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium text-white/95 opacity-0 transition group-hover:opacity-100">
                    {img.alt}
                  </span>
                  <span
                    className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#009dff] text-[#001428] opacity-0 shadow-lg transition group-hover:opacity-100"
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {active && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001b3d]/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Chiudi lightbox"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-4 sm:flex"
            aria-label="Immagine precedente"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-4 sm:flex"
            aria-label="Immagine successiva"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <figure
            className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-slate-900 sm:aspect-[16/9]">
              <Image src={active.src} alt={active.alt} fill className="object-contain" sizes="100vw" priority />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-[#001b3d] px-5 py-4 text-white">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#009dff]">
                  {active.sectionTitle}
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">{active.alt}</p>
              </div>
              <p className="text-xs text-sky-200/80">
                {activeIndex + 1} / {flatImages.length}
              </p>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
