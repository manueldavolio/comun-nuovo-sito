import { CategoryIcon } from "@/components/base-activities/BaseActivityIcons";
import { ClubButton } from "@/components/ui/ClubButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { baseActivityCategories } from "@/data/base-activities";

const accentBySlug: Record<string, string> = {
  "scuola-calcio": "from-sky-500/15 to-blue-600/5",
  "primi-calci": "from-cyan-500/15 to-sky-600/5",
  pulcini: "from-[#009dff]/20 to-blue-800/5",
  esordienti: "from-indigo-500/15 to-[#003f8f]/10",
};

export function BaseActivitiesCategories() {
  return (
    <section className="scroll-section" aria-labelledby="base-categories-heading">
      <h2 id="base-categories-heading" className="sr-only">
        Le nostre categorie
      </h2>
      <SectionHeading
        eyebrow="Percorsi formativi"
        title="Le nostre categorie"
        subtitle="Dal primo contatto con il calcio fino agli Esordienti: un percorso graduale, sereno e pensato per ogni età."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {baseActivityCategories.map((cat, index) => (
          <article
            key={cat.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-sky-200/90 hover:shadow-[var(--shadow-card-hover)] sm:p-8"
          >
            <CategoryCardBg slug={cat.slug} />
            <CategoryIndexBadge index={index} />
            <div className="relative flex items-start gap-4">
              <CategoryIconBox slug={cat.slug} />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600">{cat.ageHint}</p>
                <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-slate-900 sm:text-[1.65rem]">
                  {cat.title}
                </h3>
              </div>
            </div>
            <p className="relative mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
              {cat.cardDescription}
            </p>
            <ClubButton
              href={`/attivita-di-base/${cat.slug}`}
              variant="outlineLight"
              className="relative mt-6 w-fit"
            >
              Scopri
            </ClubButton>
          </article>
        ))}
      </div>
    </section>
  );
}

function CategoryCardBg({ slug }: { slug: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentBySlug[slug] ?? "from-sky-500/10 to-transparent"} opacity-80 transition group-hover:opacity-100`}
      aria-hidden
    />
  );
}

function CategoryIndexBadge({ index }: { index: number }) {
  return (
    <span
      className="pointer-events-none absolute right-4 top-4 font-display text-5xl leading-none text-slate-100 transition group-hover:text-sky-100/90"
      aria-hidden
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function CategoryIconBox({ slug }: { slug: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#001b3d] to-[#003f8f] text-[#7dd3fc] shadow-lg shadow-[#001b3d]/20">
      <CategoryIcon slug={slug} className="h-7 w-7" />
    </div>
  );
}
