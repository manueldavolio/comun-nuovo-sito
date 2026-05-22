import { SectionHeading } from "@/components/ui/SectionHeading";
import { baseActivitiesStaff } from "@/data/base-activities";

export function BaseActivitiesStaff() {
  return (
    <section className="scroll-section" aria-labelledby="base-staff-heading">
      <h2 id="base-staff-heading" className="sr-only">
        Il nostro staff
      </h2>
      <SectionHeading
        eyebrow="Persone al centro"
        title="Il nostro staff"
        subtitle="Tecnici e istruttori che accompagnano i bambini con attenzione, competenza e un rapporto diretto con le famiglie."
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {baseActivitiesStaff.map((member) => (
          <li key={`${member.category}-${member.name}`}>
            <article className="club-card-interactive flex h-full flex-col p-6 sm:p-7">
              <StaffAvatar initials={member.initials} />
              <h3 className="mt-5 font-display text-xl uppercase leading-tight tracking-wide text-slate-900 sm:text-2xl">
                {member.name}
              </h3>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-600">{member.role}</p>
              <p className="mt-3 text-sm font-semibold text-slate-700">{member.category}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                Un punto di riferimento per genitori e ragazzi: formazione, ascolto e crescita in un ambiente
                professionale e accogliente.
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StaffAvatar({ initials }: { initials: string }) {
  return (
    <div
      className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#001b3d] to-[#003f8f] text-2xl font-bold tracking-wide text-[#7dd3fc] shadow-inner ring-4 ring-sky-50"
      aria-hidden
    >
      {initials}
    </div>
  );
}
