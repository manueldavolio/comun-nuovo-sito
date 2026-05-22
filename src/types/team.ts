import type { MatchResult, StandingRow } from "@/types/site";

export type PlayerRole = "Portiere" | "Difensore" | "Centrocampista" | "Attaccante";

export type TeamPlayer = {
  id: string;
  number?: number | null;
  name: string;
  role: PlayerRole;
  photo?: string;
};

export type TechnicalStaffRole =
  | "Allenatore"
  | "Vice Allenatore"
  | "Collaboratore"
  | "Coordinatrice"
  | "Preparatore"
  | "Preparatore Portieri"
  | "Dirigente"
  | "Osteopata";

export type TechnicalStaffMember = {
  id: string;
  name: string;
  role: TechnicalStaffRole;
  photo?: string;
};

export type NextMatch = {
  opponent: string;
  date: string;
  venue: string;
  competition?: string;
  isHome?: boolean;
};

export type TeamHeroContent = {
  title: string;
  subtitle: string;
};

export type MatchdayFixture = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
};

export type LatestMatchday = {
  round: number;
  date: string;
  matches: MatchdayFixture[];
};

export type RosterEmptyState = {
  badge?: string;
  eyebrow?: string;
  title: string;
  message: string;
};

export type TeamPageData = {
  teamLabel: string;
  teamSeason: string;
  hero: TeamHeroContent;
  roster: TeamPlayer[];
  technicalStaff: TechnicalStaffMember[];
  results: MatchResult[];
  standings: StandingRow[];
  nextMatch?: NextMatch;
  highlightTeam?: string;
  competitionLabel?: string;
  latestMatchday?: LatestMatchday;
  standingsSubtitle?: string;
  rosterEmptyState?: RosterEmptyState;
};
