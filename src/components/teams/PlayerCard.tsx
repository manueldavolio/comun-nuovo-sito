import Image from "next/image";
import { DEFAULT_PLAYER_PHOTO } from "@/data/teams/constants";
import type { TeamPlayer } from "@/types/team";

export function PlayerCard({ player }: { player: TeamPlayer }) {
  const photo = player.photo ?? DEFAULT_PLAYER_PHOTO;

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
      </div>
      <div className="space-y-1 px-4 py-4">
        <h3 className="font-display text-lg uppercase leading-tight tracking-wide text-slate-900">{player.name}</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#003f8f]">{player.role}</p>
      </div>
    </article>
  );
}
