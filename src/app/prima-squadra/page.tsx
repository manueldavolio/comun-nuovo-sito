import { TeamLandingPage } from "@/components/teams/TeamLandingPage";
import { teamPageData } from "@/data/teams/prima-squadra";
import {
  defaultPrimaSquadraTuttocampoWidgets,
  mergeTuttocampoWidgets,
} from "@/data/teams/tuttocampo-prima-squadra";
import { fetchSitePlayers, fetchSiteTeamStaff, mergeRoster } from "@/lib/cms";
import { fetchPageContentMap, getPageContentDefinition, mergePageContent } from "@/lib/page-content";

export const metadata = {
  title: "Prima Squadra",
};

/** Nessuna cache: le modifiche fatte dal CMS sono visibili subito. */
export const dynamic = "force-dynamic";

/** Giocatori fittizi da non mostrare mai, da qualunque fonte arrivino. */
const EXCLUDED_PLAYERS = ["Nicolò Rapizza", "Andrea Cormons"];

export default async function PrimaSquadraPage() {
  const [cmsRoster, cmsStaff, contentMap] = await Promise.all([
    fetchSitePlayers("PRIMA_SQUADRA"),
    fetchSiteTeamStaff("Prima Squadra"),
    fetchPageContentMap("prima-squadra"),
  ]);

  const widgetsDefinition = getPageContentDefinition("prima-squadra", "tuttocampo");
  const widgetsContent = widgetsDefinition
    ? mergePageContent(widgetsDefinition.fallback, contentMap.get("tuttocampo"))
    : null;
  const tuttocampoWidgets = mergeTuttocampoWidgets(
    defaultPrimaSquadraTuttocampoWidgets,
    widgetsContent?.extraJson,
  );

  const competitionLabel =
    (typeof widgetsContent?.extraJson?.competitionLabel === "string" &&
      widgetsContent.extraJson.competitionLabel.trim()) ||
    teamPageData.competitionLabel;

  const data = {
    ...teamPageData,
    competitionLabel,
    // Rosa base statica + giocatori CMS uniti per nome:
    // il CMS aggiorna/aggiunge, gli statici non presenti nel CMS restano.
    roster: mergeRoster(teamPageData.roster, cmsRoster, EXCLUDED_PLAYERS),
    technicalStaff: cmsStaff.length > 0 ? cmsStaff : teamPageData.technicalStaff,
    // Niente risultati/classifica statici 2025/26 in pagina pubblica.
    results: [],
    standings: [],
    latestMatchday: undefined,
    nextMatch: undefined,
    tuttocampoWidgets,
  };

  return <TeamLandingPage data={data} />;
}
