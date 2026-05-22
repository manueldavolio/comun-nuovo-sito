import { PlayerCard } from "@/components/teams/PlayerCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROSTER_ROLE_GROUPS } from "@/data/teams/constants";
import type { TeamPlayer } from "@/types/team";

type TeamRosterGridProps = {
  players: TeamPlayer[];
};

export function TeamRosterGrid({ players }: TeamRosterGridProps) {
  return (
    <section id="rosa" className="scroll-section">
      <SectionHeading eyebrow="Rosa" title="Giocatori" subtitle="Elenco aggiornabile da file dati della squadra." />
      <div className="mt-10 space-y-12">
        {ROSTER_ROLE_GROUPS.map(({ role, label }) => {
          const group = players.filter((p) => p.role === role);
          if (group.length === 0) return null;

          return (
            <div key={role}>
              <h3 className="mb-5 flex items-center gap-3 font-display text-xl uppercase tracking-wide text-slate-900 sm:text-2xl">
                <span className="h-px max-w-12 flex-1 bg-sky-500/60" aria-hidden />
                {label}
              </h3>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                {group.map((player) => (
                  <li key={player.id}>
                    <PlayerCard player={player} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
