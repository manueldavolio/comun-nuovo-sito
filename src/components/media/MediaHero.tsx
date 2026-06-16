type MediaHeroProps = {
  title?: string;
  subtitle?: string;
};

export function MediaHero({
  title = "Media",
  subtitle = "Vivi il mondo biancoazzurro dentro e fuori dal campo.",
}: MediaHeroProps) {
  return (
    <div className="page-hero-lg">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30 hero-home-diagonals"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-25 hero-home-diagonals-soft"
        aria-hidden
      />
      <div className="page-hero-inner-wide">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7dd3fc]">
          Foto · Video · Highlights
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.92] tracking-[0.03em]">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/82 sm:text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
