import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/under-15";
import { fetchSitePlayers, fetchSiteTeamStaff } from "@/lib/cms";

export const metadata = {
  title: "Under 15",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function Under15Page() {
  // Il database ha sempre priorità: i contenuti statici restano
  // solo come fallback quando il database è vuoto.
  const [cmsRoster, cmsStaff] = await Promise.all([
    fetchSitePlayers("UNDER_15"),
    fetchSiteTeamStaff("Under 15"),
  ]);

  const data = {
    ...teamPageData,
    roster: cmsRoster.length > 0 ? cmsRoster : teamPageData.roster,
    technicalStaff: cmsStaff.length > 0 ? cmsStaff : teamPageData.technicalStaff,
  };

  return <TeamLandingPage data={data} />;
}
