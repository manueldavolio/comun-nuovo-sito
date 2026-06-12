import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/prima-squadra";
import { fetchSitePlayers, fetchSiteTeamStaff, mergeRoster } from "@/lib/cms";

export const metadata = {
  title: "Prima Squadra",
};

/** Nessuna cache: le modifiche fatte dal CMS sono visibili subito. */
export const dynamic = "force-dynamic";

/** Giocatori fittizi da non mostrare mai, da qualunque fonte arrivino. */
const EXCLUDED_PLAYERS = ["Nicolò Rapizza", "Andrea Cormons"];

export default async function PrimaSquadraPage() {
  const [cmsRoster, cmsStaff] = await Promise.all([
    fetchSitePlayers("PRIMA_SQUADRA"),
    fetchSiteTeamStaff("Prima Squadra"),
  ]);

  const data = {
    ...teamPageData,
    // Rosa base statica + giocatori CMS uniti per nome:
    // il CMS aggiorna/aggiunge, gli statici non presenti nel CMS restano.
    roster: mergeRoster(teamPageData.roster, cmsRoster, EXCLUDED_PLAYERS),
    technicalStaff: cmsStaff.length > 0 ? cmsStaff : teamPageData.technicalStaff,
  };

  return <TeamLandingPage data={data} />;
}
