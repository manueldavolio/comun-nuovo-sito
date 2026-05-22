import type { TeamPageData } from "@/types/team";

export const teamPageData = {
  teamLabel: "Under 15",
  teamSeason: "2025/2026",
  hero: {
    title: "UNDER 15",
    subtitle: "Le basi del calcio biancoazzurro.",
  },
  roster: [],
  rosterEmptyState: {
    badge: "IN AGGIORNAMENTO",
    eyebrow: "Rosa",
    title: "Rosa in aggiornamento",
    message: "L'elenco giocatori Under 15 verrà pubblicato a breve.",
  },
  technicalStaff: [{ id: "u15-st-1", name: "Umberto Figurilli", role: "Allenatore" }],
  results: [],
  standings: [],
} satisfies TeamPageData;

export const { teamLabel, teamSeason } = teamPageData;
