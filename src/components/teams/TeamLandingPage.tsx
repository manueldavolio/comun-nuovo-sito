import { NextMatchCard } from "@/components/teams/NextMatchCard";
import { TeamCompetitionBanner } from "@/components/teams/TeamCompetitionBanner";
import { TeamHero } from "@/components/teams/TeamHero";
import { TeamLatestResults } from "@/components/teams/TeamLatestResults";
import { TeamResultsTable } from "@/components/teams/TeamResultsTable";
import { TeamRosterGrid } from "@/components/teams/TeamRosterGrid";
import { TeamStandingsCompact } from "@/components/teams/TeamStandingsCompact";
import { TeamTuttocampoWidgets } from "@/components/teams/TeamTuttocampoWidgets";
import { TechnicalStaffGrid } from "@/components/teams/TechnicalStaffGrid";
import { hasAnyTuttocampoWidget } from "@/data/teams/tuttocampo-prima-squadra";
import type { TeamPageData } from "@/types/team";

type TeamLandingPageProps = {
  data: TeamPageData;
};

export function TeamLandingPage({ data }: TeamLandingPageProps) {
  const showTuttocampo = Boolean(data.tuttocampoWidgets && hasAnyTuttocampoWidget(data.tuttocampoWidgets));
  const hasCompetitionData =
    !showTuttocampo &&
    (Boolean(data.latestMatchday) ||
      data.results.length > 0 ||
      data.standings.length > 0 ||
      Boolean(data.nextMatch));

  return (
    <>
      <TeamHero hero={data.hero} season={data.teamSeason} />
      <div className="bg-[var(--club-page)]">
        <div className="page-content !py-14 sm:!py-16">
          <TeamRosterGrid players={data.roster} emptyState={data.rosterEmptyState} />
          {data.technicalStaff.length > 0 ? <TechnicalStaffGrid staff={data.technicalStaff} /> : null}
          {data.competitionLabel ? (
            <div className="mb-12 sm:mb-14">
              <TeamCompetitionBanner label={data.competitionLabel} />
            </div>
          ) : null}
          {showTuttocampo && data.tuttocampoWidgets ? (
            <TeamTuttocampoWidgets
              widgets={data.tuttocampoWidgets}
              competitionLabel={data.competitionLabel}
            />
          ) : null}
          {hasCompetitionData ? (
            <>
              <div className="grid gap-16 lg:grid-cols-2 lg:gap-10 xl:gap-12">
                {data.latestMatchday ? (
                  <TeamLatestResults matchday={data.latestMatchday} highlightTeam={data.highlightTeam} />
                ) : data.results.length > 0 ? (
                  <TeamResultsTable matches={data.results} />
                ) : null}
                {data.standings.length > 0 ? (
                  <TeamStandingsCompact
                    rows={data.standings}
                    highlightTeam={data.highlightTeam}
                    subtitle={data.standingsSubtitle}
                  />
                ) : null}
              </div>
              {data.nextMatch ? <NextMatchCard match={data.nextMatch} /> : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
