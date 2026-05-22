import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/calcio-a-5-c2";

export const metadata = {
  title: "Calcio a 5 C2",
};

export default function CalcioA5C2Page() {
  return <TeamLandingPage data={teamPageData} />;
}
