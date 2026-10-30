import type { TeamPageData } from "@/types/team";
import { defaultPrimaSquadraTuttocampoWidgets } from "@/data/teams/tuttocampo-prima-squadra";

export const teamPageData = {
  teamLabel: "Prima Squadra",
  teamSeason: "2026/2027",
  competitionLabel: "Prima Categoria Lombardia — Girone L",
  hero: {
    title: "PRIMA SQUADRA",
    subtitle: "Il cuore agonistico biancoazzurro.",
  },
  roster: [
    { id: "ps-p1", name: "Mattia Claris", role: "Portiere" },
    { id: "ps-p16", name: "Ubaldo Quitti", role: "Portiere" },
    { id: "ps-p3", name: "Simone Panara", role: "Difensore" },
    { id: "ps-p22", name: "Davide Cellauro", role: "Difensore" },
    { id: "ps-p4", name: "Lorenzo Salvi", role: "Difensore", photo: "/players/Lorenzo Salvi.jpeg" },
    { id: "ps-p5", name: "Edoardo Bolis", role: "Difensore", photo: "/players/Edoardo Bolis.jpeg" },
    { id: "ps-p7", name: "Enrico Mazzoleni", role: "Difensore" },
    { id: "ps-p17", name: "Lorenzo Rossetti", role: "Difensore", photo: "/players/Lorenzo Rossetti.jpeg" },
    { id: "ps-p18", name: "Stefano Medolago", role: "Difensore", photo: "/players/Stefano Medolago.jpeg" },
    { id: "ps-p8", name: "Davide Gusmini", role: "Centrocampista", photo: "/players/Davide Gusmini.jpeg" },
    { id: "ps-p10", name: "Marco Galletti", role: "Centrocampista", photo: "/players/Marco Galletti.jpeg" },
    { id: "ps-p11", name: "Simone Locatelli", role: "Centrocampista", photo: "/players/Simone Locatelli.jpeg" },
    { id: "ps-p12", name: "Emmanuel Marotta", role: "Centrocampista" },
    { id: "ps-p19", name: "Filippo Rota", role: "Centrocampista", photo: "/players/Filippo Rota.jpeg" },
    { id: "ps-p14", name: "Christian Meli", role: "Centrocampista" },
    { id: "ps-p23", name: "Lorenzo Bruletti", role: "Centrocampista" },
    { id: "ps-p20", name: "Matteo Sibio", role: "Attaccante", photo: "/players/Matteo Sibio.jpeg" },
    { id: "ps-p15", name: "Ronny Colleoni", role: "Attaccante" },
    { id: "ps-p21", name: "Farouk Bance", role: "Attaccante", photo: "/players/Farouk Bance.jpeg" },
  ],
  technicalStaff: [
    { id: "ps-st-1", name: "Massimo Alborghetti", role: "Allenatore", photo: "/players/Massimo Alborghetti.jpeg" },
    { id: "ps-st-2", name: "Leonardo Scalzullo", role: "Collaboratore" },
    { id: "ps-st-3", name: "Gianluca Melonari", role: "Collaboratore" },
    { id: "ps-st-4", name: "Stefano Avogadri", role: "Preparatore Portieri" },
    { id: "ps-st-5", name: "Giuseppe Boccia", role: "Collaboratore" },
    { id: "ps-st-6", name: "Davide Albanese", role: "Collaboratore" },
  ],
  results: [],
  standings: [],
  highlightTeam: "Comun Nuovo",
  tuttocampoWidgets: defaultPrimaSquadraTuttocampoWidgets,
} satisfies TeamPageData;

export const { teamLabel, teamSeason } = teamPageData;
