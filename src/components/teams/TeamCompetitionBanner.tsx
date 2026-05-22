type TeamCompetitionBannerProps = {
  label: string;
};

export function TeamCompetitionBanner({ label }: TeamCompetitionBannerProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border border-sky-200/90 bg-gradient-to-r from-white via-sky-50/80 to-white px-5 py-3.5 shadow-lg shadow-slate-900/[0.06] sm:px-8 sm:py-4">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#009dff] shadow-[0_0_8px_rgba(0,157,255,0.6)]" aria-hidden />
        <p className="font-display text-center text-base uppercase leading-tight tracking-[0.06em] text-[#001b3d] sm:text-lg">
          {label}
        </p>
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#009dff] shadow-[0_0_8px_rgba(0,157,255,0.6)]" aria-hidden />
      </div>
    </div>
  );
}
