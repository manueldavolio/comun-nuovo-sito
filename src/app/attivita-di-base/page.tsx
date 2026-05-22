import { BaseActivitiesCategories } from "@/components/base-activities/BaseActivitiesCategories";
import { BaseActivitiesFinalCta } from "@/components/base-activities/BaseActivitiesFinalCta";
import { BaseActivitiesIntroStrip } from "@/components/base-activities/BaseActivitiesIntroStrip";
import { BaseActivitiesLandingHero } from "@/components/base-activities/BaseActivitiesLandingHero";
import { BaseActivitiesPhilosophy } from "@/components/base-activities/BaseActivitiesPhilosophy";
import { BaseActivitiesStaff } from "@/components/base-activities/BaseActivitiesStaff";

export const metadata = {
  title: "Attività di Base",
  description:
    "Ogni bambino conta: formazione, divertimento e crescita in un ambiente sano e professionale. Scuola Calcio, Primi Calci, Pulcini ed Esordienti — ASD Comun Nuovo.",
};

export default function AttivitaDiBasePage() {
  return (
    <div>
      <BaseActivitiesLandingHero />

      <div className="bg-[var(--club-page)]">
        <div className="page-content-wide">
          <BaseActivitiesIntroStrip />
          <BaseActivitiesCategories />
          <BaseActivitiesPhilosophy />
          <BaseActivitiesStaff />
          <BaseActivitiesFinalCta />
        </div>
      </div>
    </div>
  );
}