import { notFound } from "next/navigation";
import { BaseActivityCategoryPage } from "@/components/base-activities/BaseActivityCategoryPage";
import { baseActivityCategories, getBaseActivityCategory } from "@/data/base-activities";
import {
  BASE_ACTIVITY_TEAM_BY_SLUG,
  fetchBaseActivityTeamStaff,
  fetchSitePlayers,
  type BaseActivityTeamSlug,
} from "@/lib/cms";
import { contentParagraphs, fetchPageContentMap, getPageContentDefinition, mergePageContent } from "@/lib/page-content";
import type { TechnicalStaffMember } from "@/types/team";

type Props = {
  params: Promise<{ slug: string }>;
};

function isBaseActivityTeamSlug(slug: string): slug is BaseActivityTeamSlug {
  return slug in BASE_ACTIVITY_TEAM_BY_SLUG;
}

export function generateStaticParams() {
  return baseActivityCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getBaseActivityCategory(slug);
  if (!category) return { title: "Categoria non trovata" };
  return {
    title: category.title,
    description: category.cardDescription,
  };
}

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function BaseActivityCategoryRoute({ params }: Props) {
  const { slug } = await params;
  const category = getBaseActivityCategory(slug);
  if (!category) notFound();

  const contentMap = await fetchPageContentMap("attivita-di-base");
  const definition = getPageContentDefinition("attivita-di-base", slug);
  const pageContent = definition ? mergePageContent(definition.fallback, contentMap.get(slug)) : null;
  const extra = pageContent?.extraJson ?? {};
  const mergedCategory = pageContent
    ? {
        ...category,
        title: pageContent.title ?? category.title,
        heroSubtitle: pageContent.subtitle ?? category.heroSubtitle,
        ageHint: String(extra.ageHint ?? category.ageHint),
        cardDescription: pageContent.subtitle ?? category.cardDescription,
        description: contentParagraphs(pageContent.content),
      }
    : category;

  const teamConfig = isBaseActivityTeamSlug(slug) ? BASE_ACTIVITY_TEAM_BY_SLUG[slug] : null;

  let roster = undefined;
  let technicalStaff: TechnicalStaffMember[] | undefined = undefined;
  let rosterEmptyState = undefined;

  if (teamConfig) {
    const [cmsRoster, cmsStaff] = await Promise.all([
      fetchSitePlayers(teamConfig.team),
      fetchBaseActivityTeamStaff(teamConfig.staffCategory),
    ]);

    roster = cmsRoster;
    rosterEmptyState = {
      badge: "IN AGGIORNAMENTO",
      eyebrow: "Rosa",
      title: "Rosa in aggiornamento",
      message: `L'elenco giocatori ${category.title} verrà pubblicato a breve.`,
    };

    technicalStaff =
      cmsStaff.length > 0
        ? cmsStaff
        : category.staffPlaceholder.map((member, index) => ({
            id: `${slug}-staff-${index}`,
            name: member.name,
            role: member.role,
          }));
  }

  return (
    <BaseActivityCategoryPage
      category={mergedCategory}
      staffText={String(extra.staffText ?? "Il team tecnico di riferimento (in aggiornamento).")}
      ctaText={String(
        extra.ctaText ?? `Per iscrizioni, orari aggiornati e informazioni sulla categoria ${category.title}, contattaci.`,
      )}
      roster={roster}
      technicalStaff={technicalStaff}
      rosterEmptyState={rosterEmptyState}
    />
  );
}
