import { legal } from "@/data/site";

export function ContactMap() {
  return (
    <section className="scroll-section" aria-labelledby="contact-map-title">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-600">Dove siamo</p>
        <h2
          id="contact-map-title"
          className="mt-2 font-display text-[clamp(1.5rem,3vw,2rem)] uppercase tracking-[0.02em] text-slate-900"
        >
          Mappa
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/[0.04]">
        <div
          className="relative aspect-[16/9] min-h-[220px] w-full sm:aspect-[21/9] sm:min-h-[280px]"
          role="img"
          aria-label={`Mappa placeholder — ${legal.legalSeat}`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-sky-50 via-slate-100 to-blue-100"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.35]"
            aria-hidden
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 63, 143, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 63, 143, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(0, 157, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0, 27, 61, 0.15) 0%, transparent 45%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shadow-sky-900/15 ring-4 ring-sky-100">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#003f8f]" aria-hidden>
                <path
                  d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="11" r="2.5" fill="currentColor" />
              </svg>
            </span>
            <div>
              <p className="font-display text-lg uppercase tracking-wide text-[#001b3d] sm:text-xl">
                {legal.legalSeat}
              </p>
              <p className="mt-1 text-sm text-slate-600">Mappa interattiva in arrivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
