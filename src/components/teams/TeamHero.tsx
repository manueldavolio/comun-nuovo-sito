import type { TeamHeroContent } from "@/types/team";

type TeamHeroProps = {
  hero: TeamHeroContent;
  season: string;
};

export function TeamHero({ hero, season }: TeamHeroProps) {
  return (
    <section
      className="relative overflow-hidden border-b border-sky-900/20 bg-[#001b3d] text-white"
      aria-labelledby="team-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 hero-home-dots opacity-[0.22]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 28%, rgba(0, 157, 255, 0.42) 0%, transparent 52%), radial-gradient(circle at 12% 80%, rgba(0, 63, 143, 0.55) 0%, transparent 48%)",
        }}
      />
      <div
        className="hero-home-diagonals-soft pointer-events-none absolute inset-y-0 right-0 w-[min(100%,420px)] opacity-35"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#009dff] sm:text-[11px]">
          Stagione {season}
        </p>
        <h1
          id="team-hero-heading"
          className="mt-3 font-display text-[clamp(2.75rem,8vw,4.5rem)] uppercase leading-[0.9] tracking-[0.04em]"
        >
          {hero.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-sky-100/90 sm:text-lg">{hero.subtitle}</p>
        <div className="mt-8 h-1 w-16 rounded-full bg-[#009dff]" aria-hidden />
      </div>
    </section>
  );
}
