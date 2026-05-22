type ClubStat = {
  id: string;
  value: string;
  label: string;
};

type SponsorClubStatsProps = {
  stats: readonly ClubStat[];
  title?: string;
};

export function SponsorClubStats({ stats, title = "Numeri del club" }: SponsorClubStatsProps) {
  return (
    <section className="scroll-section" aria-labelledby="sponsor-club-stats-title">
      <h2
        id="sponsor-club-stats-title"
        className="text-center font-display text-2xl uppercase tracking-wide text-slate-900 sm:text-3xl"
      >
        {title}
      </h2>
      <div
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
        role="list"
        aria-label={title}
      >
        {stats.map((stat) => (
          <div
            key={stat.id}
            role="listitem"
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-3 py-6 text-center shadow-md shadow-slate-900/[0.04] transition hover:border-sky-200 hover:shadow-lg sm:px-4 sm:py-7"
          >
            <p className="font-display text-2xl tabular-nums leading-none tracking-wide text-[#003f8f] sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase leading-tight tracking-[0.16em] text-slate-500 sm:text-[11px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
