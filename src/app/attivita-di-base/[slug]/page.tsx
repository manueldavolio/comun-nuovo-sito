import { notFound } from "next/navigation";
import { BaseActivityCategoryPage } from "@/components/base-activities/BaseActivityCategoryPage";
import { baseActivityCategories, getBaseActivityCategory } from "@/data/base-activities";

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

export default async function BaseActivityCategoryRoute({ params }: Props) {
  const { slug } = await params;
  const category = getBaseActivityCategory(slug);
  if (!category) notFound();
  return <BaseActivityCategoryPage category={category} />;
}
