import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/under-19";
import { fetchSitePlayers } from "@/lib/cms";

export const metadata = {
  title: "Under 19",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function Under19Page() {
  // Rosa dal CMS (gestionale): se presente sostituisce quella statica.
  const cmsRoster = await fetchSitePlayers("UNDER_19");
  const data = cmsRoster.length > 0 ? { ...teamPageData, roster: cmsRoster } : teamPageData;

  return <TeamLandingPage data={data} />;
}
