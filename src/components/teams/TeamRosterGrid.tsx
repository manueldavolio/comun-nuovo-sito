import { PlayerCard } from "@/components/teams/PlayerCard";
import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROSTER_ROLE_GROUPS } from "@/data/teams/constants";
import type { RosterEmptyState, TeamPlayer } from "@/types/team";

type TeamRosterGridProps = {
  players: TeamPlayer[];
  emptyState?: RosterEmptyState;
};

const defaultEmptyState: RosterEmptyState = {
  badge: "IN AGGIORNAMENTO",
  eyebrow: "Rosa",
  title: "Rosa in aggiornamento",
  message: "L'elenco giocatori verrà pubblicato a breve.",
};

export function TeamRosterGrid({ players, emptyState }: TeamRosterGridProps) {
  const state = emptyState ?? defaultEmptyState;

  return (
    <section id="rosa" className="scroll-section">
      <SectionHeading
        eyebrow="Rosa"
        title={players.length > 0 ? "Giocatori" : state.title}
        subtitle={
          players.length > 0
            ? "Elenco aggiornabile da file dati della squadra."
            : "Contenuti ufficiali in preparazione."
        }
      />
      {players.length === 0 ? (
        <div className="mt-10">
          <ContentPlaceholder
            badge={state.badge}
            eyebrow={state.eyebrow}
            title={state.title}
            message={state.message}
          />
        </div>
      ) : (
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
      )}
    </section>
  );
}
