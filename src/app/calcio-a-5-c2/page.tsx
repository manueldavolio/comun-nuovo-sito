import { TeamUnderConstructionPage } from "@/components/teams/TeamUnderConstructionPage";
import { teamHero, teamSeason, underConstruction } from "@/data/teams/calcio-a-5-c2";

export const metadata = {
  title: "Calcio a 5 C2",
};

export default function CalcioA5C2Page() {
  return (
    <TeamUnderConstructionPage
      season={teamSeason}
      hero={teamHero}
      badge={underConstruction.badge}
      title={underConstruction.title}
      message={underConstruction.message}
    />
  );
}
