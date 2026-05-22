import { CollaborationCategoryIcon } from "@/components/collaborations/CollaborationCategoryIcon";
import type { CollaborationCategory } from "@/data/collaborations";

export function CollaborationCategoryCard({ category }: { category: CollaborationCategory }) {
  return (
    <article className="club-card-interactive group flex h-full flex-col p-6 sm:p-7">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 text-[#003f8f] ring-1 ring-sky-100 transition duration-300 group-hover:from-sky-100 group-hover:to-sky-200/80 group-hover:ring-sky-200">
        <CollaborationCategoryIcon id={category.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-xl uppercase leading-tight tracking-wide text-slate-900 sm:text-[1.35rem]">
        {category.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
        {category.description}
      </p>
    </article>
  );
}
