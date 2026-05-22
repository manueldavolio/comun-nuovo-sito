import type { TeamPageData } from "@/types/team";

export const teamPageData = {
  teamLabel: "Femminile",
  teamSeason: "2025/2026",
  hero: {
    title: "FEMMINILE",
    subtitle: "Il calcio biancoazzurro al femminile.",
  },
  roster: [],
  rosterEmptyState: {
    badge: "IN AGGIORNAMENTO",
    eyebrow: "Rosa",
    title: "Rosa in aggiornamento",
    message: "La rosa della squadra femminile verrà presentata prossimamente.",
  },
  technicalStaff: [
    { id: "fem-st-1", name: "Manuel D'Avolio", role: "Allenatore" },
    { id: "fem-st-2", name: "Roberto Paris", role: "Allenatore" },
    { id: "fem-st-3", name: "Nicole Bosio", role: "Coordinatrice" },
  ],
  results: [],
  standings: [],
} satisfies TeamPageData;

export const { teamLabel, teamSeason } = teamPageData;
