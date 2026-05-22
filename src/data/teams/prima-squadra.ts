import type { TeamPageData } from "@/types/team";
import type { StandingRow } from "@/types/site";

function standing(position: number, team: string, points: number): StandingRow {
  return {
    position,
    team,
    points,
    played: 30,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
  };
}

export const teamPageData = {
  teamLabel: "Prima Squadra",
  teamSeason: "2025/2026",
  competitionLabel: "Prima Categoria — Girone M",
  standingsSubtitle: "Aggiornata alla 30ª giornata.",
  hero: {
    title: "PRIMA SQUADRA",
    subtitle: "Il cuore agonistico biancoazzurro.",
  },
  roster: [
    { id: "ps-p1", name: "Mattia Claris", role: "Portiere" },
    { id: "ps-p2", name: "Nicolò Rapizza", role: "Portiere" },
    { id: "ps-p3", name: "Simone Panara", role: "Difensore" },
    { id: "ps-p4", name: "Lorenzo Salvi", role: "Difensore" },
    { id: "ps-p5", name: "Edoardo Bolis", role: "Difensore" },
    { id: "ps-p6", name: "Davide Tolotti", role: "Difensore" },
    { id: "ps-p7", name: "Enrico Mazzoleni", role: "Difensore" },
    { id: "ps-p8", name: "Davide Gusmini", role: "Centrocampista" },
    { id: "ps-p9", name: "Thomas Dotti", role: "Centrocampista" },
    { id: "ps-p10", name: "Marco Galletti", role: "Centrocampista" },
    { id: "ps-p11", name: "Simone Locatelli", role: "Centrocampista" },
    { id: "ps-p12", name: "Emmanuel Marotta", role: "Centrocampista" },
    { id: "ps-p13", name: "Andrea Cormons", role: "Centrocampista" },
    { id: "ps-p14", name: "Christian Meli", role: "Centrocampista" },
    { id: "ps-p15", name: "Ronny Colleoni", role: "Attaccante" },
  ],
  technicalStaff: [
    { id: "ps-st-1", name: "Massimo Alborghetti", role: "Allenatore" },
    { id: "ps-st-2", name: "Leonardo Scalzullo", role: "Collaboratore" },
    { id: "ps-st-3", name: "Gianluca Melonari", role: "Collaboratore" },
    { id: "ps-st-4", name: "Stefano Avogadri", role: "Collaboratore" },
    { id: "ps-st-5", name: "Giuseppe Boccia", role: "Collaboratore" },
    { id: "ps-st-6", name: "Davide Albanese", role: "Collaboratore" },
    { id: "ps-st-7", name: "Miriam Diotti", role: "Osteopata" },
  ],
  results: [],
  latestMatchday: {
    round: 30,
    date: "2026-04-26",
    matches: [
      {
        id: "g30-1",
        homeTeam: "Accademia Isola Bergamasca",
        awayTeam: "Comun Nuovo",
        homeGoals: 4,
        awayGoals: 4,
      },
      {
        id: "g30-2",
        homeTeam: "Audace Osnago",
        awayTeam: "Revolutional Carvico",
        homeGoals: 1,
        awayGoals: 4,
      },
      {
        id: "g30-3",
        homeTeam: "Cassina Calcio",
        awayTeam: "Carugate",
        homeGoals: 2,
        awayGoals: 1,
      },
      {
        id: "g30-4",
        homeTeam: "Cavenago",
        awayTeam: "Roncola",
        homeGoals: 2,
        awayGoals: 2,
      },
      {
        id: "g30-5",
        homeTeam: "Città Di Cornate",
        awayTeam: "Atletico Grignano",
        homeGoals: 0,
        awayGoals: 3,
      },
      {
        id: "g30-6",
        homeTeam: "Cosov",
        awayTeam: "Football Club Cernusco",
        homeGoals: 2,
        awayGoals: 2,
      },
      {
        id: "g30-7",
        homeTeam: "Monvico",
        awayTeam: "Nuova Usmate",
        homeGoals: 2,
        awayGoals: 1,
      },
    ],
  },
  standings: [
    standing(1, "BMS Tritium Next Gen", 59),
    standing(2, "Cassina Calcio", 58),
    standing(3, "Cavenago", 56),
    standing(4, "Nuova Usmate", 52),
    standing(5, "Monvico", 49),
    standing(6, "Atletico Grignano", 41),
    standing(7, "Accademia Isola Bergamasca", 38),
    standing(8, "Audace Osnago", 37),
    standing(9, "Città Di Cornate", 33),
    standing(10, "Comun Nuovo", 30),
    standing(11, "Revolutional Carvico", 29),
    standing(12, "Football Club Cernusco", 28),
    standing(13, "Carugate", 24),
    standing(14, "Roncola", 22),
    standing(15, "Cosov", 20),
  ],
  highlightTeam: "Comun Nuovo",
} satisfies TeamPageData;

export const { teamLabel, teamSeason } = teamPageData;
