import type { StandingRow } from "@/types/site";

export function StandingsTable({ rows, highlightTeam }: { rows: StandingRow[]; highlightTeam?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-slate-950/40">
      <table className="min-w-full text-left text-sm text-sky-50">
        <thead className="bg-slate-950/90 text-xs uppercase tracking-wider text-sky-300">
          <tr>
            <th className="px-3 py-3 font-bold">#</th>
            <th className="px-3 py-3 font-bold">Squadra</th>
            <th className="px-3 py-3 font-bold">G</th>
            <th className="px-3 py-3 font-bold">V</th>
            <th className="px-3 py-3 font-bold">N</th>
            <th className="px-3 py-3 font-bold">P</th>
            <th className="px-3 py-3 font-bold">GF</th>
            <th className="px-3 py-3 font-bold">GS</th>
            <th className="px-3 py-3 font-bold">Pt</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const hi =
              highlightTeam &&
              (r.team.toLowerCase().includes(highlightTeam.toLowerCase()) ||
                r.team.toLowerCase().includes("comun nuovo"));
            return (
              <tr
                key={`${r.position}-${r.team}`}
                className={`border-t border-white/5 ${
                  hi ? "bg-sky-500/15 ring-1 ring-inset ring-sky-400/40" : "hover:bg-white/5"
                }`}
              >
                <td className="px-3 py-2.5 font-mono text-sky-200">{r.position}</td>
                <td className="px-3 py-2.5 font-semibold text-white">{r.team}</td>
                <td className="px-3 py-2.5 text-sky-200/90">{r.played}</td>
                <td className="px-3 py-2.5 text-sky-200/90">{r.won}</td>
                <td className="px-3 py-2.5 text-sky-200/90">{r.drawn}</td>
                <td className="px-3 py-2.5 text-sky-200/90">{r.lost}</td>
                <td className="px-3 py-2.5 text-sky-200/90">{r.goalsFor}</td>
                <td className="px-3 py-2.5 text-sky-200/90">{r.goalsAgainst}</td>
                <td className="px-3 py-2.5 font-bold text-sky-100">{r.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
