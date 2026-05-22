import { SectionHeading } from "@/components/ui/SectionHeading";

type StaffHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function StaffHero({ eyebrow, title, subtitle }: StaffHeroProps) {
  return (
    <div className="page-hero">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30 hero-home-diagonals"
        aria-hidden
      />
      <div className="page-hero-inner">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} light />
      </div>
    </div>
  );
}
