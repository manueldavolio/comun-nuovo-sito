import { SectionHeading } from "@/components/ui/SectionHeading";

type SponsorHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SponsorHero({ eyebrow, title, subtitle }: SponsorHeroProps) {
  return (
    <div className="page-hero-light">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#009dff]/15 blur-3xl"
        aria-hidden
      />
      <div className="page-hero-inner">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
      </div>
    </div>
  );
}
