import type { Player } from "@/types/site";

export function RosterTable({ players }: { players: Player[] }) {
  const athletes = players.filter((p) => p.number !== null);
  const staff = players.filter((p) => p.number === null);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-slate-950/40 backdrop-blur">
        <table className="w-full text-left text-sm text-sky-50">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-sky-300">
            <tr>
              <th className="px-4 py-3 font-bold">#</th>
              <th className="px-4 py-3 font-bold">Calciatore</th>
              <th className="px-4 py-3 font-bold">Ruolo</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((p) => (
              <tr
                key={p.id}
                className="border-t border-white/5 transition hover:bg-sky-500/10"
              >
                <td className="px-4 py-3 font-mono text-sky-200">{p.number}</td>
                <td className="px-4 py-3 font-semibold text-white">{p.name}</td>
                <td className="px-4 py-3 text-sky-200/90">{p.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {staff.length > 0 ? (
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-sky-300">
            Staff tecnico
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {staff.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-sky-100"
              >
                <p className="font-semibold text-white">{p.name}</p>
                <p className="text-sky-300/90">{p.role}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
