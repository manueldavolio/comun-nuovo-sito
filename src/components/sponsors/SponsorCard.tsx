import Image from "next/image";
import type { Sponsor } from "@/types/site";

type SponsorCardProps = {
  sponsor: Sponsor;
  featured?: boolean;
};

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M10 2h4v4M6 10l8-8M9 2H3.5A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SponsorCard({ sponsor, featured = false }: SponsorCardProps) {
  const logoBox = featured ? "h-32 sm:h-36" : "h-24 sm:h-28";
  const logoSize = featured ? { width: 220, height: 88 } : { width: 180, height: 72 };
  const logoClass = featured ? "h-16 sm:h-20" : "h-12 sm:h-14";

  const logo = (
    <Image
      src={sponsor.logoUrl}
      alt={`Logo ${sponsor.name}`}
      width={logoSize.width}
      height={logoSize.height}
      className={`${logoClass} w-auto max-w-full object-contain`}
    />
  );

  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-900/[0.06] sm:p-7 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white px-6 ${logoBox}`}
      >
        {sponsor.website ? (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="transition opacity-90 hover:opacity-100"
          >
            {logo}
          </a>
        ) : (
          logo
        )}
      </div>

      <h3
        className={`mt-5 font-display uppercase leading-tight tracking-wide text-slate-900 ${
          featured ? "text-xl sm:text-2xl" : "text-lg"
        }`}
      >
        {sponsor.name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
        {sponsor.description}
      </p>

      {sponsor.website ? (
        <a
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-sky-700 transition group-hover:text-sky-800"
        >
          Visita il sito
          <ExternalLinkIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : (
        <span className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-300">
          Sito in arrivo
        </span>
      )}
    </article>
  );
}
