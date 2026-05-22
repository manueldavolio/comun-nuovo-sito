import type { PlayerRole } from "@/types/team";

export const DEFAULT_PLAYER_PHOTO = "/images/players/placeholder.svg";

export const ROSTER_ROLE_GROUPS: { role: PlayerRole; label: string }[] = [
  { role: "Portiere", label: "Portieri" },
  { role: "Difensore", label: "Difensori" },
  { role: "Centrocampista", label: "Centrocampisti" },
  { role: "Attaccante", label: "Attaccanti" },
];
