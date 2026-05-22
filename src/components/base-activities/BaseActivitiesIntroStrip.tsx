import { baseActivitiesIntro } from "@/data/base-activities";

export function BaseActivitiesIntroStrip() {
  return (
    <section className="scroll-section" aria-label="Messaggio per le famiglie">
      <div className="relative overflow-hidden rounded-2xl border border-sky-100/80 bg-white px-6 py-8 shadow-[var(--shadow-card)] sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-100/80"
          aria-hidden
        />
        <p className="relative text-center text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-relaxed">
          {baseActivitiesIntro}
        </p>
        <ul className="relative mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#003f8f] sm:text-[11px]">
          <li>Crescita</li>
          <li>Serenità</li>
          <li>Educazione</li>
          <li>Professionalità</li>
          <li>Ambiente familiare</li>
        </ul>
      </div>
    </section>
  );
}
