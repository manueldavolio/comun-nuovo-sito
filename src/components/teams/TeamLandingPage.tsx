import { NextMatchCard } from "@/components/teams/NextMatchCard";
import { TeamCompetitionBanner } from "@/components/teams/TeamCompetitionBanner";
import { TeamHero } from "@/components/teams/TeamHero";
import { TeamLatestResults } from "@/components/teams/TeamLatestResults";
import { TeamResultsTable } from "@/components/teams/TeamResultsTable";
import { TeamRosterGrid } from "@/components/teams/TeamRosterGrid";
import { TeamStandingsCompact } from "@/components/teams/TeamStandingsCompact";
import { TechnicalStaffGrid } from "@/components/teams/TechnicalStaffGrid";
import type { TeamPageData } from "@/types/team";

type TeamLandingPageProps = {
  data: TeamPageData;
};

export function TeamLandingPage({ data }: TeamLandingPageProps) {
  return (
    <>
      <TeamHero hero={data.hero} season={data.teamSeason} />
      <div className="bg-[var(--club-page)]">
        <div className="page-content !py-14 sm:!py-16">
          <TeamRosterGrid players={data.roster} />
          <TechnicalStaffGrid staff={data.technicalStaff} />
          {data.competitionLabel ? (
            <div className="mb-12 sm:mb-14">
              <TeamCompetitionBanner label={data.competitionLabel} />
            </div>
          ) : null}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            {data.latestMatchday ? (
              <TeamLatestResults matchday={data.latestMatchday} highlightTeam={data.highlightTeam} />
            ) : (
              <TeamResultsTable matches={data.results} />
            )}
            <TeamStandingsCompact
              rows={data.standings}
              highlightTeam={data.highlightTeam}
              subtitle={data.standingsSubtitle}
            />
          </div>
          {data.nextMatch ? <NextMatchCard match={data.nextMatch} /> : null}
        </div>
      </div>
    </>
  );
}
