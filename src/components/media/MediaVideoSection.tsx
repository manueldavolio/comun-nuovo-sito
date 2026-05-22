"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { YoutubeVideo } from "@/types/site";

type MediaVideoSectionProps = {
  videos: YoutubeVideo[];
};

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function MediaVideoSection({ videos }: MediaVideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState<YoutubeVideo | null>(null);

  const close = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVideo, close]);

  const featured = videos.find((v) => v.featured);
  const others = videos.filter((v) => !v.featured);

  return (
    <section className="scroll-mt-24" id="video">
      <SectionHeading
        eyebrow="YouTube"
        title="Video"
        subtitle="Highlights, interviste e dietro le quinte del club."
      />

      <div className="mt-10 space-y-8">
        {featured ? (
          <article className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_28px_70px_-36px_rgba(15,23,42,0.22)]">
            <button
              type="button"
              onClick={() => setActiveVideo(featured)}
              className="group relative block w-full text-left"
            >
              <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden bg-slate-900 sm:min-h-[280px]">
                <Image
                  src={youtubeThumb(featured.youtubeId)}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="100vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001b3d]/90 via-[#001b3d]/30 to-[#001b3d]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#009dff] text-[#001428] shadow-[0_12px_40px_-8px_rgba(0,157,255,0.8)] transition group-hover:scale-110 sm:h-20 sm:w-20">
                    <PlayIcon className="ml-1 h-8 w-8 sm:h-10 sm:w-10" />
                  </span>
                </div>
                <span className="absolute left-5 top-5 rounded-full bg-[#009dff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#001428]">
                  In evidenza
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900 sm:text-3xl">
                  {featured.title}
                </h3>
                {featured.description ? (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    {featured.description}
                  </p>
                ) : null}
              </div>
            </button>
          </article>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {others.map((video) => (
            <article
              key={video.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:border-sky-300/60 hover:shadow-[0_28px_56px_-24px_rgba(0,157,255,0.2)]"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(video)}
                className="relative block w-full text-left"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <Image
                    src={youtubeThumb(video.youtubeId)}
                    alt=""
                    fill
                    className={`object-cover transition duration-500 ${video.comingSoon ? "opacity-60 grayscale-[0.2]" : "group-hover:scale-[1.05]"}`}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001b3d]/75 to-transparent" />
                  {!video.comingSoon ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#001b3d] shadow-lg transition group-hover:scale-110">
                        <PlayIcon className="ml-0.5 h-5 w-5" />
                      </span>
                    </div>
                  ) : (
                    <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      Prossimamente
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg uppercase tracking-wide text-slate-900 sm:text-xl">
                    {video.title}
                  </h3>
                  {video.description ? (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {video.description}
                    </p>
                  ) : null}
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeVideo ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001b3d]/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Chiudi video"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full">
              <iframe
                title={activeVideo.title}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="bg-[#001b3d] px-5 py-4 text-sm font-semibold text-white sm:text-base">
              {activeVideo.title}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
