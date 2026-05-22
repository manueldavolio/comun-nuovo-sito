import Image from "next/image";
import { DEFAULT_PLAYER_PHOTO } from "@/data/teams/constants";
import type { TeamPlayer } from "@/types/team";

function formatPlayerNumber(number: number | null | undefined): string {
  return number != null ? `N° ${number}` : "N° —";
}

export function PlayerCard({ player }: { player: TeamPlayer }) {
  const photo = player.photo ?? DEFAULT_PLAYER_PHOTO;
  const numberLabel = formatPlayerNumber(player.number);

  return (
    <article className="club-card-interactive group overflow-hidden rounded-2xl">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#001b3d]">
        <Image
          src={photo}
          alt={player.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001b3d]/90 via-[#001b3d]/20 to-transparent" />
        <span
          className={`absolute left-3 top-3 flex items-center justify-center rounded-lg bg-[#009dff] font-display leading-none text-[#001428] shadow-lg shadow-sky-900/30 ${
            player.number != null ? "h-10 w-10 text-xl" : "px-2.5 py-2 text-base"
          }`}
        >
          {player.number != null ? player.number : "—"}
        </span>
      </div>
      <div className="space-y-1 px-4 py-4">
        <h3 className="font-display text-lg uppercase leading-tight tracking-wide text-slate-900">{player.name}</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#003f8f]">{player.role}</p>
        <p className="text-xs font-semibold tabular-nums text-slate-500">{numberLabel}</p>
      </div>
    </article>
  );
}
