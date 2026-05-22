import Link from "next/link";
import { baseActivitiesFinalCta } from "@/data/base-activities";
import { gestionaleUrl } from "@/data/site";

export function BaseActivitiesFinalCta() {
  const { title, description } = baseActivitiesFinalCta;

  return (
    <section className="scroll-section" aria-labelledby="base-final-cta-title">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#001b3d] via-blue-950 to-[#003f8f] px-6 py-14 text-center text-white shadow-[var(--shadow-elevated)] sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 hero-home-dots opacity-[0.15]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(0, 157, 255, 0.45) 0%, transparent 55%)",
          }}
        />
        <div
          className="hero-home-diagonals pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7dd3fc]">Prossima stagione</p>
          <h2
            id="base-final-cta-title"
            className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] uppercase leading-tight tracking-[0.02em]"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-sky-100/90 sm:text-lg">{description}</p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#009dff] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#001428] shadow-[0_8px_28px_-6px_rgba(0,157,255,0.65)] transition hover:bg-[#33b0ff] sm:text-[11px]"
            >
              Contatti
            </Link>
            <Link
              href={gestionaleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border-2 border-white/90 bg-transparent px-8 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10 sm:text-[11px]"
            >
              Gestionale
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}