import { notFound } from "next/navigation";
import { BaseActivityCategoryPage } from "@/components/base-activities/BaseActivityCategoryPage";
import { baseActivityCategories, getBaseActivityCategory } from "@/data/base-activities";
import { contentParagraphs, fetchPageContentMap, getPageContentDefinition, mergePageContent } from "@/lib/page-content";

type Props = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <BaseActivityCategoryPage
      category={mergedCategory}
      staffText={String(extra.staffText ?? "Il team tecnico di riferimento (in aggiornamento).")}
      ctaText={String(
        extra.ctaText ?? `Per iscrizioni, orari aggiornati e informazioni sulla categoria ${category.title}, contattaci.`,
      )}
    />
  );
}
