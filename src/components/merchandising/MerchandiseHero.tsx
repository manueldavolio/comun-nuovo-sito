import { SectionHeading } from "@/components/ui/SectionHeading";

type MerchandiseHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function MerchandiseHero({ eyebrow, title, subtitle }: MerchandiseHeroProps) {
  return (
    <section className="page-hero-lg">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-35 hero-home-diagonals"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-20 hero-home-diagonals-soft"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[#009dff]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" aria-hidden />
      <div className="page-hero-inner-wide">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} light />
      </div>
    </section>
  );
}
