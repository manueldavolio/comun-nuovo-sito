import { ClubButton } from "@/components/ui/ClubButton";

const ctaLinks = [
  { label: "Iscrizioni", href: "/attivita-di-base" },
  { label: "Sponsorizzazioni", href: "/sponsor" },
  { label: "Collaborazioni", href: "/collaborazioni" },
] as const;

export function ContactFamilyCta() {
  return (
    <section className="scroll-section" aria-labelledby="contact-family-title">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-[#001b3d] via-blue-950 to-[#003f8f] px-6 py-12 text-center text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(0, 157, 255, 0.4) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2
            id="contact-family-title"
            className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] uppercase leading-tight tracking-[0.02em]"
          >
            Vuoi entrare nella famiglia biancoazzurra?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-sky-100/90 sm:text-lg">
            Scopri come iscriverti, sostenere il club o avviare una collaborazione con la società.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {ctaLinks.map(({ label, href }) => (
              <ClubButton key={href} href={href} variant="primary" className="w-full sm:w-auto sm:px-8">
                {label}
              </ClubButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
