import { SectionHeading } from "@/components/ui/SectionHeading";

type NewsHeroProps = {
  title?: string;
  subtitle?: string;
};

export function NewsHero({
  title = "Ultime News",
  subtitle = "Tutte le novità dal mondo biancoazzurro.",
}: NewsHeroProps) {
  return (
    <div className="page-hero">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30 hero-home-diagonals"
        aria-hidden
      />
      <div className="page-hero-inner-wide">
        <SectionHeading eyebrow="Comunicazione" title={title} subtitle={subtitle} light />
      </div>
    </div>
  );
}
