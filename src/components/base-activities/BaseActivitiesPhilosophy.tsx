import { PhilosophyIcon } from "@/components/base-activities/BaseActivityIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { baseActivitiesPhilosophy } from "@/data/base-activities";

export function BaseActivitiesPhilosophy() {
  return (
    <section
      className="scroll-section relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-[#001b3d] via-[#002a56] to-[#003f8f] px-6 py-12 text-white shadow-[var(--shadow-elevated)] sm:px-10 sm:py-14 lg:px-12 lg:py-16"
      aria-labelledby="base-philosophy-heading"
    >
      <div className="pointer-events-none absolute inset-0 hero-home-dots opacity-[0.12]" aria-hidden />
      <div
        className="hero-home-diagonals-soft pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#009dff]/20 blur-[80px]"
        aria-hidden
      />

      <div className="relative">
        <h2 id="base-philosophy-heading" className="sr-only">
          La nostra filosofia
        </h2>
        <SectionHeading
          eyebrow="La nostra filosofia"
          title="Crescere insieme, sul campo e nella vita"
          subtitle="Il bambino al centro: professionalità, serenità e un ambiente familiare dove imparare giocando."
          light
          align="center"
          className="mx-auto"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {baseActivitiesPhilosophy.map((value) => (
            <li
              key={value.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition duration-300 hover:border-[#009dff]/40 hover:bg-white/[0.1] sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#009dff]/20 text-[#7dd3fc] ring-1 ring-[#009dff]/30 transition group-hover:bg-[#009dff]/30">
                <PhilosophyIcon icon={value.icon} />
              </div>
              <h3 className="mt-5 font-display text-xl uppercase tracking-wide text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-[0.9375rem]">{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
