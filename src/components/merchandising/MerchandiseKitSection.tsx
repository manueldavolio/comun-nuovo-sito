import { ClubButton } from "@/components/ui/ClubButton";

type MerchandiseKitSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export function MerchandiseKitSection({
  eyebrow,
  title,
  description,
  buttonLabel,
  href,
}: MerchandiseKitSectionProps) {
  return (
    <section className="scroll-section" aria-labelledby="merch-kit-title">
      <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/[0.06]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#001b3d] via-blue-950 to-[#003f8f] px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0%, rgba(0, 157, 255, 0.45) 0%, transparent 55%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.06) 0%, transparent 40%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-2/5 opacity-25 hero-home-diagonals"
            aria-hidden
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-sky-300">{eyebrow}</p>
              <h2
                id="merch-kit-title"
                className="font-display mt-3 max-w-xl text-[clamp(1.75rem,3.5vw,2.5rem)] uppercase leading-tight tracking-[0.02em]"
              >
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-sky-100/90 sm:text-lg">{description}</p>
            </div>
            <div className="flex shrink-0 lg:justify-end">
              <ClubButton href={href} variant="outline" className="w-full sm:w-auto sm:px-8">
                {buttonLabel}
              </ClubButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
