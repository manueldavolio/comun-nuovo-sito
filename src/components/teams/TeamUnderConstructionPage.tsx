import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import { TeamHero } from "@/components/teams/TeamHero";
import type { TeamHeroContent } from "@/types/team";

type TeamUnderConstructionPageProps = {
  season: string;
  hero: TeamHeroContent;
  badge: string;
  title: string;
  message: string;
};

export function TeamUnderConstructionPage({
  season,
  hero,
  badge,
  title,
  message,
}: TeamUnderConstructionPageProps) {
  return (
    <>
      <TeamHero hero={hero} season={season} />
      <div className="bg-[var(--club-page)]">
        <div className="page-content !py-14 sm:!py-16">
          <ContentPlaceholder badge={badge} title={title} message={message} />
        </div>
      </div>
    </>
  );
}
