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

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/[0.04]">
        <iframe
          title="Google Maps - Centro Sportivo Comun Nuovo"
          src="https://www.google.com/maps?q=Centro+Sportivo+Comun+Nuovo,+Via+Azzurri+2006,+Comun+Nuovo+(BG)&output=embed"
          className="h-[320px] w-full md:h-[420px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
