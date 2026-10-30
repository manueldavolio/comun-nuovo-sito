import type { TuttocampoWidgetsConfig } from "@/data/teams/tuttocampo-prima-squadra";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TeamTuttocampoWidgetsProps = {
  widgets: TuttocampoWidgetsConfig;
  competitionLabel?: string;
};

function WidgetFrame({
  src,
  title,
  heightClass,
}: {
  src: string;
  title: string;
  heightClass: string;
}) {
  if (!src.trim()) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.04]">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`block w-full max-w-full border-0 ${heightClass}`}
      />
    </div>
  );
}

export function TeamTuttocampoWidgets({ widgets, competitionLabel }: TeamTuttocampoWidgetsProps) {
  return (
    <section id="campionato" className="scroll-section max-w-full space-y-10 overflow-x-hidden sm:space-y-12">
      <SectionHeading
        eyebrow="Campionato"
        title={competitionLabel ?? "Risultati e classifica"}
        subtitle="Dati ufficiali Tuttocampo — aggiornamento automatico."
      />

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003f8f]">
            Ultima partita
          </h3>
          <WidgetFrame
            src={widgets.lastMatchUrl}
            title="Ultima partita — Tuttocampo"
            heightClass="h-[300px] sm:h-[350px]"
          />
        </div>
        <div>
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003f8f]">
            Prossima partita
          </h3>
          <WidgetFrame
            src={widgets.nextMatchUrl}
            title="Prossima partita — Tuttocampo"
            heightClass="h-[300px] sm:h-[350px]"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-start">
        <div id="risultati" className="min-w-0 scroll-section">
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003f8f]">
            Risultati
          </h3>
          <WidgetFrame
            src={widgets.resultsUrl}
            title="Risultati girone — Tuttocampo"
            heightClass="h-[520px] sm:h-[600px] lg:h-[640px]"
          />
        </div>
        <div id="classifica" className="min-w-0 scroll-section">
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003f8f]">
            Classifica
          </h3>
          <WidgetFrame
            src={widgets.standingsUrl}
            title="Classifica girone — Tuttocampo"
            heightClass="h-[720px] sm:h-[820px] lg:h-[860px]"
          />
        </div>
      </div>

      <div id="marcatori" className="min-w-0">
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003f8f]">
          Marcatori
        </h3>
        <WidgetFrame
          src={widgets.scorersUrl}
          title="Marcatori girone — Tuttocampo"
          heightClass="h-[560px] sm:h-[700px] lg:h-[740px]"
        />
      </div>
    </section>
  );
}
