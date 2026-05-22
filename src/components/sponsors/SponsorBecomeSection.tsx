import { ClubButton } from "@/components/ui/ClubButton";

type Benefit = {
  id: string;
  title: string;
  description: string;
};

type SponsorBecomeSectionProps = {
  title: string;
  text: string;
  buttonLabel: string;
  href: string;
  benefits: readonly Benefit[];
};

function BenefitIcon({ id, className }: { id: string; className?: string }) {
  const common = { className, "aria-hidden": true as const };

  switch (id) {
    case "visibility":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path
            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "events":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "social":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path
            d="M7 8h10M7 12h6M7 16h8M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "territory":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path
            d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "networking":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7.5 10 14M16 7.5 14 14M8.5 8.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export function SponsorBecomeSection({
  title,
  text,
  buttonLabel,
  href,
  benefits,
}: SponsorBecomeSectionProps) {
  return (
    <section className="scroll-section" aria-labelledby="sponsor-become-title">
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.06]">
        <div className="relative bg-gradient-to-br from-[#001b3d] via-blue-950 to-[#003f8f] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 0%, rgba(0, 157, 255, 0.45) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2
              id="sponsor-become-title"
              className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] uppercase leading-tight tracking-[0.02em]"
            >
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sky-100/90 sm:text-lg">{text}</p>
            <div className="mt-8 flex justify-center">
              <ClubButton href={href} variant="primary" className="sm:px-8">
                {buttonLabel}
              </ClubButton>
            </div>
          </div>
        </div>

        <ul className="grid gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <li
              key={benefit.id}
              className="flex flex-col bg-gradient-to-b from-white to-sky-50/40 px-5 py-6 sm:px-6 sm:py-7"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#003f8f]">
                <BenefitIcon id={benefit.id} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-sm uppercase tracking-wide text-slate-900 sm:text-base">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
