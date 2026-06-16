import Link from "next/link";
import { BaseActivitiesHero } from "@/components/base-activities/BaseActivitiesHero";
import { ClubButton } from "@/components/ui/ClubButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BaseActivityCategory } from "@/data/base-activities";

type BaseActivityCategoryPageProps = {
  category: BaseActivityCategory;
  staffText?: string;
  ctaText?: string;
};

export function BaseActivityCategoryPage({
  category,
  staffText = "Il team tecnico di riferimento (in aggiornamento).",
  ctaText = `Per iscrizioni, orari aggiornati e informazioni sulla categoria ${category.title}, contattaci.`,
}: BaseActivityCategoryPageProps) {
  return (
    <div>
      <BaseActivitiesHero
        eyebrow="Attività di Base"
        title={category.title}
        subtitle={category.heroSubtitle}
      />

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">{category.ageHint}</p>
            <article className="mt-6 space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/[0.04] sm:p-8">
              {category.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-slate-600 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </article>
          </section>

          <section>
            <SectionHeading title="Staff categoria" subtitle={staffText} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.staffPlaceholder.map((member) => (
                <li
                  key={`${member.role}-${member.name}`}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md shadow-slate-900/[0.04] sm:p-6"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600">{member.role}</p>
                  <p className="mt-3 font-display text-xl uppercase tracking-wide text-slate-900">{member.name}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading title="Giorni e allenamenti" subtitle="Programma indicativo — orari e calendario da confermare." />
            <ul className="mt-8 space-y-3">
              {category.schedulePlaceholder.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">{item.label}</span>
                  <span className="text-sm text-slate-600 sm:text-base">{item.detail}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading title="Obiettivi formativi" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {category.objectives.map((objective) => (
                <li
                  key={objective.slice(0, 40)}
                  className="flex gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{objective}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50 to-white p-8 text-center shadow-lg shadow-sky-900/[0.06] sm:p-10">
            <h2 className="font-display text-2xl uppercase tracking-wide text-slate-900 sm:text-3xl">
              Vuoi saperne di più?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base text-slate-600">
              {ctaText}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <ClubButton href="/contatti" variant="primary">
                Contattaci per informazioni
              </ClubButton>
              <Link
                href="/attivita-di-base"
                className="text-sm font-semibold text-sky-700 hover:text-sky-900"
              >
                ← Tutte le categorie
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
