import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MatchResult } from "@/types/site";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function formatScore(match: MatchResult) {
  const ours = match.isHome ? match.goalsFor : match.goalsAgainst;
  const theirs = match.isHome ? match.goalsAgainst : match.goalsFor;
  return `${ours} – ${theirs}`;
}

type TeamResultsTableProps = {
  matches: MatchResult[];
};

export function TeamResultsTable({ matches }: TeamResultsTableProps) {
  return (
    <section id="risultati" className="scroll-section">
      <SectionHeading eyebrow="Risultati" title="Ultimi risultati" subtitle="Le ultime partite disputate dalla squadra." />

      {matches.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
          Nessun risultato disponibile.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/[0.04]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#001b3d] text-xs font-bold uppercase tracking-wider text-sky-200">
                <tr>
                  <th className="px-4 py-3.5 sm:px-6">Avversario</th>
                  <th className="px-4 py-3.5 sm:px-6">Risultato</th>
                  <th className="px-4 py-3.5 sm:px-6">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {matches.map((match) => (
                  <tr key={match.id} className="transition hover:bg-sky-50/60">
                    <td className="px-4 py-4 font-semibold text-slate-900 sm:px-6">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-sky-600">
                        {match.isHome ? "Casa" : "Trasferta"}
                      </span>
                      {match.opponent}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className="inline-flex min-w-[4.5rem] justify-center rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-base font-bold text-[#001b3d]">
                        {formatScore(match)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 sm:px-6">{formatDate(match.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
