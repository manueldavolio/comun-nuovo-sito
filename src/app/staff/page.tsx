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
import { fetchPageContentMap, getPageContentDefinition, mergePageContent, staffSectionKey } from "@/lib/page-content";

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
  const [cmsStaff, contentMap] = await Promise.all([
    fetchSiteStaff(),
    fetchPageContentMap("staff"),
  ]);
  const useCms = cmsStaff.length > 0;
  const heroDefinition = getPageContentDefinition("staff", "hero");
  const heroContent = heroDefinition ? mergePageContent(heroDefinition.fallback, contentMap.get("hero")) : null;

  return (
    <div>
      <StaffHero
        eyebrow={staffHero.eyebrow}
        title={heroContent?.title ?? staffHero.title}
        subtitle={heroContent?.subtitle ?? staffHero.subtitle}
      />

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          {staffCategorySections.map(({ category, subtitle }) => {
            const members = useCms
              ? cmsStaff.filter((member) => member.category === category)
              : getStaffByCategory(category);
            const definition = getPageContentDefinition("staff", staffSectionKey(category));
            const content = definition
              ? mergePageContent(definition.fallback, contentMap.get(staffSectionKey(category)))
              : null;

            return (
              <StaffCategorySection
                key={category}
                title={category}
                subtitle={content?.subtitle ?? subtitle}
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
