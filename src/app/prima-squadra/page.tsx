import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/prima-squadra";

export const metadata = {
  title: "Prima Squadra",
};

export default function PrimaSquadraPage() {
  return <TeamLandingPage data={teamPageData} />;
}
