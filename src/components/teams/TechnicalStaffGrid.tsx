import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TechnicalStaffMember } from "@/types/team";

const STAFF_PHOTOS = [
  "/images/staff/placeholder-1.svg",
  "/images/staff/placeholder-2.svg",
  "/images/staff/placeholder-3.svg",
  "/images/staff/placeholder-4.svg",
];

type TechnicalStaffGridProps = {
  staff: TechnicalStaffMember[];
};

export function TechnicalStaffGrid({ staff }: TechnicalStaffGridProps) {
  return (
    <section id="staff" className="scroll-section">
      <SectionHeading
        eyebrow="Staff tecnico"
        title="In panchina"
        subtitle="Allenatori, collaboratori e figure di accompagnamento al gruppo."
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {staff.map((member, index) => {
          const photo = member.photo ?? STAFF_PHOTOS[index % STAFF_PHOTOS.length];

          return (
            <li
              key={member.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-900/[0.06]"
            >
              <div className="relative aspect-[5/3] overflow-hidden bg-[#001b3d]">
                <Image
                  src={photo}
                  alt={member.name}
                  fill
                  className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001b3d] to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600">{member.role}</p>
                <p className="mt-2 font-display text-xl uppercase leading-tight tracking-wide text-slate-900 sm:text-2xl">
                  {member.name}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
