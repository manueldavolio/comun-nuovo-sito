import { StaffCategorySection } from "@/components/staff/StaffCategorySection";
import { StaffHero } from "@/components/staff/StaffHero";
import { StaffJoinCta } from "@/components/staff/StaffJoinCta";
import {
  getStaffByCategory,
  staffCategorySections,
  staffHero,
  staffJoinCta,
} from "@/data/staff";

export const metadata = {
  title: "Staff",
  description:
    "Allenatori, collaboratori e figure di supporto del Comun Nuovo: persone, competenze e passione al servizio dei nostri ragazzi.",
};

export default function StaffPage() {
  return (
    <div>
      <StaffHero
        eyebrow={staffHero.eyebrow}
        title={staffHero.title}
        subtitle={staffHero.subtitle}
      />

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          {staffCategorySections.map(({ category, subtitle }) => (
            <StaffCategorySection
              key={category}
              title={category}
              subtitle={subtitle}
              members={getStaffByCategory(category)}
            />
          ))}

          <StaffJoinCta
            title={staffJoinCta.title}
            subtitle={staffJoinCta.subtitle}
            buttonLabel={staffJoinCta.buttonLabel}
            href={staffJoinCta.href}
          />
        </div>
      </div>
    </div>
  );
}
