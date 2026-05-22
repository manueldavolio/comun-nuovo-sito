import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactHero() {
  return (
    <div className="page-hero">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30 hero-home-diagonals"
        aria-hidden
      />
      <div className="page-hero-inner">
        <SectionHeading
          eyebrow="Comun Nuovo"
          title="Contatti"
          subtitle="Entra in contatto con il mondo biancoazzurro."
          light
        />
      </div>
    </div>
  );
}
