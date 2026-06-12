import { ContentPlaceholder } from "@/components/ui/ContentPlaceholder";
import { SponsorBecomeSection } from "@/components/sponsors/SponsorBecomeSection";
import { SponsorClubStats } from "@/components/sponsors/SponsorClubStats";
import { SponsorHero } from "@/components/sponsors/SponsorHero";
import { SponsorTierSection } from "@/components/sponsors/SponsorTierSection";
import {
  sponsorBecome,
  sponsorBenefits,
  sponsorClubStats,
  sponsorHero,
  sponsors,
  sponsorsEmptyState,
  sponsorTierSections,
} from "@/data/sponsors";
import { fetchSiteSponsors } from "@/lib/cms";

export const metadata = {
  title: "Sponsor",
  description:
    "I partner che sostengono A.S.D. Comun Nuovo: scopri i nostri sponsor e come diventare parte del progetto biancoazzurro.",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function SponsorPage() {
  // Il database ha sempre priorità: gli sponsor statici restano
  // solo come fallback quando il database è vuoto.
  const cmsSponsors = await fetchSiteSponsors();
  const allSponsors = cmsSponsors.length > 0 ? cmsSponsors : sponsors;

  return (
    <div>
      <SponsorHero
        eyebrow={sponsorHero.eyebrow}
        title={sponsorHero.title}
        subtitle={sponsorHero.subtitle}
      />

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          {allSponsors.length === 0 ? (
            <div className="mb-14 sm:mb-16">
              <ContentPlaceholder
                badge={sponsorsEmptyState.badge}
                eyebrow="Partner"
                title={sponsorsEmptyState.title}
                message={sponsorsEmptyState.message}
              />
            </div>
          ) : (
            sponsorTierSections.map(({ tier, label }) => (
              <SponsorTierSection
                key={tier}
                tier={tier}
                label={label}
                sponsors={allSponsors.filter((s) => s.tier === tier)}
              />
            ))
          )}

          <SponsorBecomeSection
            title={sponsorBecome.title}
            text={sponsorBecome.text}
            buttonLabel={sponsorBecome.buttonLabel}
            href={sponsorBecome.href}
            benefits={sponsorBenefits}
          />

          <SponsorClubStats stats={sponsorClubStats} />
        </div>
      </div>
    </div>
  );
}
