import { SponsorCard } from "@/components/sponsors/SponsorCard";
import type { Sponsor, SponsorTier } from "@/types/site";

type SponsorTierSectionProps = {
  label: string;
  tier: SponsorTier;
  sponsors: Sponsor[];
};

const gridByTier: Record<SponsorTier, string> = {
  main: "mt-8 grid gap-6 sm:grid-cols-2",
  gold: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  partner: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  technical: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function SponsorTierSection({ label, tier, sponsors }: SponsorTierSectionProps) {
  if (sponsors.length === 0) return null;

  const isMain = tier === "main";

  return (
    <section className="scroll-section" aria-labelledby={`sponsor-tier-${tier}`}>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
        <h2
          id={`sponsor-tier-${tier}`}
          className="font-display text-2xl uppercase tracking-wide text-slate-900 sm:text-3xl"
        >
          {label}
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-600">
          {sponsors.length} {sponsors.length === 1 ? "partner" : "partner"}
        </span>
      </div>

      <ul className={gridByTier[tier]}>
        {sponsors.map((sponsor) => (
          <li key={sponsor.id}>
            <SponsorCard sponsor={sponsor} featured={isMain} />
          </li>
        ))}
      </ul>
    </section>
  );
}
