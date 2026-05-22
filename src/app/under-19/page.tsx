import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/under-19";

export const metadata = {
  title: "Under 19",
};

export default function Under19Page() {
  return <TeamLandingPage data={teamPageData} />;
}
