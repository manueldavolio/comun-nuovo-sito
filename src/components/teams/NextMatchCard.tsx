import { clubShortName } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { NextMatch } from "@/types/team";

function formatMatchDate(iso: string) {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

type NextMatchCardProps = {
  match: NextMatch;
};

export function NextMatchCard({ match }: NextMatchCardProps) {
  const homeFirst = match.isHome !== false;

  return (
    <section id="prossima-partita" className="scroll-section">
      <SectionHeading eyebrow="Calendario" title="Prossima partita" />

      <article className="relative mt-8 overflow-hidden rounded-2xl border border-sky-300/60 bg-gradient-to-br from-[#001b3d] via-[#002a56] to-[#003f8f] p-6 text-white shadow-xl shadow-sky-900/20 sm:p-8 lg:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 0%, rgba(0, 157, 255, 0.45) 0%, transparent 50%)",
          }}
        />
        <div className="hero-home-diagonals-soft pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30" aria-hidden />

        <div className="relative">
          {match.competition ? (
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#009dff]">{match.competition}</p>
          ) : null}

          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            <p className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
              {homeFirst ? clubShortName : match.opponent}
            </p>
            <span className="rounded-full bg-[#009dff] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#001428]">
              vs
            </span>
            <p className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
              {homeFirst ? match.opponent : clubShortName}
            </p>
          </div>

          <dl className="mt-8 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">Data e ora</dt>
              <dd className="mt-1 text-sm font-medium capitalize text-white sm:text-base">
                {formatMatchDate(match.date)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">Campo</dt>
              <dd className="mt-1 text-sm font-medium text-white sm:text-base">{match.venue}</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
}
