import { foundationYear } from "@/data/site";

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.67 0-8 1.34-8 4v2h10v-2c0-.48-.17-.93-.45-1.35M16 13c2.8 0 6 1.47 6 3.5V19h-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconField({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 12h4M18 12h4M12 4v3M12 17v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 7-3 4.5 4.5 0 0 1 7 3c0 5.65-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type HomeStatsBarProps = {
  /** Valori dal CMS (Impostazioni sito); se assenti usa i valori statici */
  settings?: {
    foundationYear: number;
    teamsCount: string;
    membersCount: string;
    fieldsCount: string;
  } | null;
};

export function HomeStatsBar({ settings }: HomeStatsBarProps) {
  const statBar = [
    {
      value: String(settings?.foundationYear ?? foundationYear),
      label: "Anno di fondazione",
      Icon: IconCalendar,
    },
    { value: settings?.teamsCount ?? "8", label: "Squadre", Icon: IconUsers },
    { value: settings?.membersCount ?? "200+", label: "Tesserati", Icon: IconUsers },
    { value: settings?.fieldsCount ?? "4", label: "Campi", Icon: IconField },
    { value: "1", label: "Grande famiglia", Icon: IconHeart },
  ];

  return (
    <div className="relative z-10 -mt-4 px-3 md:-mt-7 sm:px-5 lg:-mt-7 lg:px-6">
      <div className="site-container-home">
        <div
          className="flex min-h-[56px] snap-x snap-mandatory overflow-x-auto rounded-[14px] border border-[#e8ecf0] bg-white shadow-[0_12px_40px_-18px_rgba(0,27,61,0.18)] md:grid md:min-h-[60px] md:grid-cols-5 md:overflow-visible md:snap-none"
          role="region"
          aria-label="Numeri della società"
        >
          {statBar.map((s, i) => (
            <div
              key={s.label}
              className={`flex min-w-[42%] shrink-0 snap-start flex-col items-center justify-center gap-0.5 px-2 py-2 md:min-w-0 md:px-1.5 md:py-2.5 ${i > 0 ? "md:border-l md:border-[#eef1f4]" : ""}`}
            >
              <s.Icon className="h-4 w-4 text-[#003f8f] md:h-[18px] md:w-[18px]" />
              <p className="font-display text-lg tabular-nums tracking-wide text-[#003f8f] md:text-xl">
                {s.value}
              </p>
              <p className="max-w-[9rem] text-center text-[7.5px] font-bold uppercase leading-tight tracking-[0.12em] text-[#001b3d]/52 md:max-w-none md:text-[8px] md:tracking-[0.14em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
