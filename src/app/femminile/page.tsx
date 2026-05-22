import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/femminile";

export const metadata = {
  title: "Femminile",
};

export default function FemminilePage() {
  return <TeamLandingPage data={teamPageData} />;
}
