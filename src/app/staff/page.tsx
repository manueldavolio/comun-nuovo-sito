import { StaffCategorySection } from "@/components/staff/StaffCategorySection";
import { StaffHero } from "@/components/staff/StaffHero";
import { StaffJoinCta } from "@/components/staff/StaffJoinCta";
import {
  getStaffByCategory,
  staffCategorySections,
  staffHero,
  staffJoinCta,
} from "@/data/staff";
import { fetchSiteStaff } from "@/lib/cms";

export const metadata = {
  title: "Staff",
  description:
    "Allenatori, collaboratori e figure di supporto del Comun Nuovo: persone, competenze e passione al servizio dei nostri ragazzi.",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function StaffPage() {
  // Il database ha sempre priorità: se contiene almeno un membro dello staff
  // si mostra SOLO il database; i contenuti statici restano solo come
  // fallback quando il database è completamente vuoto.
  const cmsStaff = await fetchSiteStaff();
  const useCms = cmsStaff.length > 0;

  return (
    <div>
      <StaffHero
        eyebrow={staffHero.eyebrow}
        title={staffHero.title}
        subtitle={staffHero.subtitle}
      />

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          {staffCategorySections.map(({ category, subtitle }) => {
            const members = useCms
              ? cmsStaff.filter((member) => member.category === category)
              : getStaffByCategory(category);

            return (
              <StaffCategorySection
                key={category}
                title={category}
                subtitle={subtitle}
                members={members}
              />
            );
          })}

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
