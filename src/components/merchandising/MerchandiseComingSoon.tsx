import { ClubButton } from "@/components/ui/ClubButton";

type MerchandiseComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function MerchandiseComingSoon({ eyebrow, title, description }: MerchandiseComingSoonProps) {
  return (
    <section className="relative overflow-hidden border-t border-slate-200/80 bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-sky-50/40 to-white" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,480px)] w-[min(90vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/90 bg-white p-10 text-center shadow-lg shadow-slate-900/5 sm:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-sky-700">{eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl uppercase tracking-wide text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ClubButton href="/news">Resta aggiornato</ClubButton>
            <ClubButton href="/contatti" variant="outlineLight">
              Contatta la segreteria
            </ClubButton>
          </div>
        </div>
      </div>
    </section>
  );
}
