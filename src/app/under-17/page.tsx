import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/under-17";

export const metadata = {
  title: "Under 17",
};

export default function Under17Page() {
  return <TeamLandingPage data={teamPageData} />;
}
