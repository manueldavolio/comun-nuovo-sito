import { CollaborationCategoriesSection } from "@/components/collaborations/CollaborationCategoriesSection";
import { CollaborationPartnersSection } from "@/components/collaborations/CollaborationPartnersSection";
import { CollaborationsHero } from "@/components/collaborations/CollaborationsHero";
import { StaffJoinCta } from "@/components/staff/StaffJoinCta";
import {
  collaborationCategories,
  collaborationPartners,
  collaborationPartnersSection,
  collaborationsBecomeCta,
  collaborationsHero,
  collaborationsIntro,
} from "@/data/collaborations";

export const metadata = {
  title: "Collaborazioni",
  description:
    "Rete di collaborazioni sportive, educative e territoriali di A.S.D. Comun Nuovo: insieme per crescere dentro e fuori dal campo.",
};

export default function CollaborazioniPage() {
  return (
    <div>
      <CollaborationsHero
        eyebrow={collaborationsHero.eyebrow}
        title={collaborationsHero.title}
        subtitle={collaborationsHero.subtitle}
      />

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          <section className="scroll-section">
            <article className="mx-auto max-w-3xl rounded-2xl border border-sky-100/80 bg-gradient-to-br from-white via-sky-50/30 to-white p-6 text-center shadow-lg shadow-slate-900/[0.05] sm:p-10">
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{collaborationsIntro}</p>
            </article>
          </section>

          <CollaborationPartnersSection
            title={collaborationPartnersSection.title}
            subtitle={collaborationPartnersSection.subtitle}
            partners={collaborationPartners}
          />

          <CollaborationCategoriesSection categories={collaborationCategories} />

          <StaffJoinCta
            title={collaborationsBecomeCta.title}
            subtitle={collaborationsBecomeCta.subtitle}
            buttonLabel={collaborationsBecomeCta.buttonLabel}
            href={collaborationsBecomeCta.href}
          />
        </div>
      </div>
    </div>
  );
}
