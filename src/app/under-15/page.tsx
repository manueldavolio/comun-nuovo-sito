import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/under-15";

export const metadata = {
  title: "Under 15",
};

export default function Under15Page() {
  return <TeamLandingPage data={teamPageData} />;
}
