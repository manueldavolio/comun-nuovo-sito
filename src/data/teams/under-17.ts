import type { TeamPageData } from "@/types/team";

export const teamPageData = {
  teamLabel: "Under 17",
  teamSeason: "2025/2026",
  hero: {
    title: "UNDER 17",
    subtitle: "Crescita, impegno e identità di club.",
  },
  roster: [],
  rosterEmptyState: {
    badge: "IN AGGIORNAMENTO",
    eyebrow: "Rosa",
    title: "Rosa in aggiornamento",
    message: "L'elenco giocatori Under 17 verrà pubblicato a breve.",
  },
  technicalStaff: [
    { id: "u17-st-1", name: "Giuseppe Zecchini", role: "Allenatore" },
    { id: "u17-st-2", name: "Aldo Albergoni", role: "Vice Allenatore" },
    { id: "u17-st-3", name: "Emanuele Rota", role: "Collaboratore" },
  ],
  results: [],
  standings: [],
} satisfies TeamPageData;

export const { teamLabel, teamSeason } = teamPageData;
