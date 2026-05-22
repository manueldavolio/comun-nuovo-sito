import { CollaborationCategoryCard } from "@/components/collaborations/CollaborationCategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CollaborationCategory } from "@/data/collaborations";

type Props = {
  categories: CollaborationCategory[];
};

export function CollaborationCategoriesSection({ categories }: Props) {
  return (
    <section className="scroll-section" aria-labelledby="collaboration-categories-title">
      <SectionHeading
        title="Le nostre collaborazioni"
        subtitle="Cinque ambiti in cui costruiamo relazioni durature con il territorio."
      />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <CollaborationCategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
