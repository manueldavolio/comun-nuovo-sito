import { ClubButton } from "@/components/ui/ClubButton";

type StaffJoinCtaProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
};

export function StaffJoinCta({ title, subtitle, buttonLabel, href }: StaffJoinCtaProps) {
  return (
    <section className="scroll-section">
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
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] uppercase leading-tight tracking-[0.02em]">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-sky-100/90 sm:text-lg">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <ClubButton href={href} variant="primary" className="sm:px-8">
              {buttonLabel}
            </ClubButton>
          </div>
        </div>
      </div>
    </section>
  );
}
