import type { TeamPageData } from "@/types/team";

export const teamPageData = {
  teamLabel: "Under 19",
  teamSeason: "2025/2026",
  hero: {
    title: "UNDER 19",
    subtitle: "Il futuro biancoazzurro in campo.",
  },
  roster: [],
  rosterEmptyState: {
    badge: "IN AGGIORNAMENTO",
    eyebrow: "Rosa",
    title: "Rosa in aggiornamento",
    message: "L'elenco giocatori Under 19 verrà pubblicato a breve.",
  },
  technicalStaff: [
    { id: "u19-st-1", name: "Antonino Chinnici", role: "Allenatore" },
    { id: "u19-st-2", name: "Dario", role: "Vice Allenatore" },
    { id: "u19-st-3", name: "Aldo Albergoni", role: "Collaboratore" },
    { id: "u19-st-4", name: "Moris Agati", role: "Collaboratore" },
  ],
  results: [],
  standings: [],
} satisfies TeamPageData;

export const { teamLabel, teamSeason } = teamPageData;
