import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StandingRow } from "@/types/site";

type TeamStandingsCompactProps = {
  rows: StandingRow[];
  highlightTeam?: string;
  subtitle?: string;
};

function isHighlighted(team: string, highlightTeam?: string) {
  if (!highlightTeam) return team.toLowerCase().includes("comun nuovo");
  return team.toLowerCase().includes(highlightTeam.toLowerCase());
}

export function TeamStandingsCompact({ rows, highlightTeam, subtitle }: TeamStandingsCompactProps) {
  return (
    <section id="classifica" className="scroll-section">
      <SectionHeading
        eyebrow="Classifica"
        title="Classifica"
        subtitle={subtitle ?? "Posizioni aggiornabili da file dati."}
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/[0.04]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#001b3d] text-xs font-bold uppercase tracking-wider text-sky-200">
              <tr>
                <th className="w-16 px-4 py-3.5 sm:px-6">Pos</th>
                <th className="px-4 py-3.5 sm:px-6">Squadra</th>
                <th className="w-20 px-4 py-3.5 text-right sm:px-6">Pt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => {
                const hi = isHighlighted(row.team, highlightTeam);
                return (
                  <tr
                    key={`${row.position}-${row.team}`}
                    className={
                      hi
                        ? "bg-gradient-to-r from-sky-100/95 via-sky-50 to-sky-100/80 ring-1 ring-inset ring-sky-300/70"
                        : "hover:bg-slate-50"
                    }
                  >
                    <td className="px-4 py-3.5 font-mono font-bold text-sky-700 sm:px-6">{row.position}</td>
                    <td className={`px-4 py-3.5 sm:px-6 ${hi ? "font-bold text-[#001b3d]" : "font-medium text-slate-800"}`}>
                      {row.team}
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900 sm:px-6">{row.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
