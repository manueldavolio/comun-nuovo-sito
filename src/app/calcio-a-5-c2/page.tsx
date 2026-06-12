import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { TeamUnderConstructionPage } from "@/components/teams/TeamUnderConstructionPage";
import { teamHero, teamLabel, teamSeason, underConstruction } from "@/data/teams/calcio-a-5-c2";
import { fetchSitePlayers } from "@/lib/cms";

export const metadata = {
  title: "Calcio a 5 C2",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function CalcioA5C2Page() {
  // Il database ha sempre priorità: il placeholder "in costruzione"
  // resta solo finché non ci sono giocatori nel database.
  const cmsRoster = await fetchSitePlayers("CALCIO_A_5_C2");

  if (cmsRoster.length === 0) {
    return (
      <TeamUnderConstructionPage
        season={teamSeason}
        hero={teamHero}
        badge={underConstruction.badge}
        title={underConstruction.title}
        message={underConstruction.message}
      />
    );
  }

  return (
    <TeamLandingPage
      data={{
        teamLabel,
        teamSeason,
        hero: teamHero,
        roster: cmsRoster,
        technicalStaff: [],
        results: [],
        standings: [],
      }}
    />
  );
}
