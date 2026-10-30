/** Widget ufficiali Tuttocampo — Prima Categoria Lombardia Girone L 2026/27 */

export const TUTTOCAMPO_PRIMA_SQUADRA_UUID = "d82a0a48-6756-4296-a22e-242330459e6e";

const BASE = "https://www.tuttocampo.it/WidgetV2";
const SEASON = "2026-27";

function widgetUrl(kind: string) {
  return `${BASE}/${kind}/${TUTTOCAMPO_PRIMA_SQUADRA_UUID}?y=${SEASON}`;
}

export type TuttocampoWidgetsConfig = {
  lastMatchUrl: string;
  nextMatchUrl: string;
  resultsUrl: string;
  standingsUrl: string;
  scorersUrl: string;
};

export const defaultPrimaSquadraTuttocampoWidgets: TuttocampoWidgetsConfig = {
  lastMatchUrl: widgetUrl("Partita"),
  nextMatchUrl: widgetUrl("ProssimaPartita"),
  resultsUrl: widgetUrl("Risultati"),
  standingsUrl: widgetUrl("Classifica"),
  scorersUrl: widgetUrl("Marcatori"),
};

export function mergeTuttocampoWidgets(
  fallback: TuttocampoWidgetsConfig,
  extra?: Record<string, unknown> | null,
): TuttocampoWidgetsConfig {
  if (!extra) return fallback;

  const pick = (key: keyof TuttocampoWidgetsConfig) => {
    const value = extra[key];
    return typeof value === "string" && value.trim() ? value.trim() : fallback[key];
  };

  return {
    lastMatchUrl: pick("lastMatchUrl"),
    nextMatchUrl: pick("nextMatchUrl"),
    resultsUrl: pick("resultsUrl"),
    standingsUrl: pick("standingsUrl"),
    scorersUrl: pick("scorersUrl"),
  };
}

export function hasAnyTuttocampoWidget(widgets: TuttocampoWidgetsConfig): boolean {
  return Object.values(widgets).some((url) => Boolean(url.trim()));
}
