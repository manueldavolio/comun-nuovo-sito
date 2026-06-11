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
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {staff.map((member, index) => {
          const photo = member.photo ?? STAFF_PHOTOS[index % STAFF_PHOTOS.length];

          return (
            <li
              key={member.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-900/[0.06]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#001b3d]">
                <Image
                  src={photo}
                  alt={member.name}
                  fill
                  className="object-cover object-[center_top] transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001b3d]/90 via-[#001b3d]/20 to-transparent" />
              </div>
              <div className="space-y-1 px-4 py-4">
                <h3 className="font-display text-lg uppercase leading-tight tracking-wide text-slate-900">
                  {member.name}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#003f8f]">{member.role}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
