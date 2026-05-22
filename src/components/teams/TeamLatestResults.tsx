import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LatestMatchday } from "@/types/team";

function formatMatchdayDate(iso: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function involvesClub(team: string, highlightTeam?: string) {
  const needle = (highlightTeam ?? "comun nuovo").toLowerCase();
  return team.toLowerCase().includes(needle);
}

type TeamLatestResultsProps = {
  matchday: LatestMatchday;
  highlightTeam?: string;
};

export function TeamLatestResults({ matchday, highlightTeam }: TeamLatestResultsProps) {
  return (
    <section id="risultati" className="scroll-section">
      <SectionHeading
        eyebrow="Risultati"
        title="Ultimi Risultati"
        subtitle={`${matchday.round}ª giornata — ${formatMatchdayDate(matchday.date)}`}
      />

      <ul className="mt-8 space-y-3">
        {matchday.matches.map((fixture) => {
          const highlighted =
            involvesClub(fixture.homeTeam, highlightTeam) || involvesClub(fixture.awayTeam, highlightTeam);

          return (
            <li
              key={fixture.id}
              className={`overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg ${
                highlighted
                  ? "border-sky-300/80 bg-gradient-to-r from-sky-100/90 via-sky-50 to-sky-100/70 shadow-sky-900/[0.08] ring-1 ring-sky-200/80"
                  : "border-slate-200/90 bg-white shadow-slate-900/[0.04] hover:border-sky-200/80"
              }`}
            >
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
                <p
                  className={`min-w-0 flex-1 text-right text-sm font-semibold leading-snug sm:text-base ${
                    involvesClub(fixture.homeTeam, highlightTeam) ? "text-[#001b3d]" : "text-slate-800"
                  }`}
                >
                  {fixture.homeTeam}
                </p>

                <div
                  className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-mono text-lg font-bold tracking-tight sm:min-w-[7.5rem] sm:text-xl ${
                    highlighted ? "bg-[#001b3d] text-sky-100" : "bg-slate-100 text-[#001b3d]"
                  }`}
                  aria-label={`Risultato: ${fixture.homeTeam} ${fixture.homeGoals}, ${fixture.awayTeam} ${fixture.awayGoals}`}
                >
                  <span>{fixture.homeGoals}</span>
                  <span className="text-sm font-normal opacity-60" aria-hidden>
                    –
                  </span>
                  <span>{fixture.awayGoals}</span>
                </div>

                <p
                  className={`min-w-0 flex-1 text-left text-sm font-semibold leading-snug sm:text-base ${
                    involvesClub(fixture.awayTeam, highlightTeam) ? "text-[#001b3d]" : "text-slate-800"
                  }`}
                >
                  {fixture.awayTeam}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
