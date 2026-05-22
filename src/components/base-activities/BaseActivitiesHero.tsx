import { SectionHeading } from "@/components/ui/SectionHeading";

type BaseActivitiesHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
};

export function BaseActivitiesHero({ eyebrow, title, subtitle }: BaseActivitiesHeroProps) {
  return (
    <div className="page-hero">
      <div className="page-hero-inner">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} light />
      </div>
    </div>
  );
}
