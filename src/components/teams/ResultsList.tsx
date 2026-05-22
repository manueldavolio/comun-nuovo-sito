import type { MatchResult } from "@/types/site";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function ResultsList({ matches }: { matches: MatchResult[] }) {
  if (matches.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-sm text-sky-200/80">
        Nessun risultato disponibile. Aggiorna il file dati della squadra.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {matches.map((m) => {
        const label = m.isHome ? "Comun Nuovo" : m.opponent;
        const away = m.isHome ? m.opponent : "Comun Nuovo";
        const left = m.isHome ? m.goalsFor : m.goalsAgainst;
        const right = m.isHome ? m.goalsAgainst : m.goalsFor;

        return (
          <li
            key={m.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/90 to-slate-900/40 p-4 transition hover:border-sky-400/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  {m.competition}
                </p>
                <p className="mt-1 text-xs text-sky-200/70">{formatDate(m.date)}</p>
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-center gap-3 text-sm font-semibold text-white sm:justify-end">
                <span className="max-w-[140px] truncate text-right">{label}</span>
                <span className="rounded-lg bg-slate-950/80 px-3 py-1 font-mono text-lg tracking-tight text-sky-100 ring-1 ring-sky-500/30">
                  {left} — {right}
                </span>
                <span className="max-w-[140px] truncate text-left">{away}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
