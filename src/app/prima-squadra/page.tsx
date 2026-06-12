import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/prima-squadra";
import { fetchSitePlayers, fetchSiteTeamStaff } from "@/lib/cms";

export const metadata = {
  title: "Prima Squadra",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function PrimaSquadraPage() {
  // Il database ha sempre priorità: i contenuti statici restano
  // solo come fallback quando il database è vuoto.
  const [cmsRoster, cmsStaff] = await Promise.all([
    fetchSitePlayers("PRIMA_SQUADRA"),
    fetchSiteTeamStaff("Prima Squadra"),
  ]);

  const data = {
    ...teamPageData,
    roster: cmsRoster.length > 0 ? cmsRoster : teamPageData.roster,
    technicalStaff: cmsStaff.length > 0 ? cmsStaff : teamPageData.technicalStaff,
  };

  return <TeamLandingPage data={data} />;
}
