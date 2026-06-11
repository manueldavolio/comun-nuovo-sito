import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/prima-squadra";
import { fetchSitePlayers } from "@/lib/cms";

export const metadata = {
  title: "Prima Squadra",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function PrimaSquadraPage() {
  // Rosa dal CMS (gestionale): se presente sostituisce quella statica.
  const cmsRoster = await fetchSitePlayers("PRIMA_SQUADRA");
  const data = cmsRoster.length > 0 ? { ...teamPageData, roster: cmsRoster } : teamPageData;

  return <TeamLandingPage data={data} />;
}
