import Image from "next/image";
import Link from "next/link";
import { claim, clubNameFormal } from "@/data/site";

export function Hero() {
  return (
    <section
      className="relative isolate h-[min(440px,58vw)] min-h-[380px] overflow-hidden bg-[#001b3d] text-white sm:min-h-[400px] lg:h-[428px] lg:min-h-0"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 hero-home-dots opacity-[0.28]" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] flex-col px-4 pb-[max(5.5rem,calc(3rem+50px))] pt-4 sm:px-5 sm:pb-[max(5rem,calc(2.5rem+50px))] lg:flex-row lg:items-stretch lg:gap-4 lg:pb-8 lg:pl-6 lg:pr-4 lg:pt-0 xl:pl-8 xl:pr-5">
        <div className="relative z-20 flex min-h-0 flex-1 flex-col justify-center lg:max-w-[min(100%,480px)] lg:shrink-0 lg:py-0 lg:pr-2 xl:max-w-[min(100%,500px)]">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <Image
              src="/logo.png"
              alt={`Logo ${clubNameFormal}`}
              width={96}
              height={96}
              priority
              unoptimized
              className="h-[4.25rem] w-auto shrink-0 object-contain sm:h-[5.25rem]"
            />
          </div>

          <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#009dff] sm:mt-3 sm:text-[11px]">
            {clubNameFormal}
          </p>

          <h1
            id="hero-heading"
            className="mt-0.5 font-display text-[clamp(2.15rem,6.2vw,3.85rem)] uppercase leading-[0.88] tracking-[0.03em] sm:text-[clamp(2.35rem,5.4vw,3.95rem)] lg:mt-1"
          >
            <span className="block text-white">CUORE</span>
            <span className="block text-white">
              BIANCO<span className="text-[#009dff]">AZZURRO</span>
            </span>
            <span className="block text-white">SUL TERRITORIO</span>
          </h1>

          <p className="mt-2 max-w-[26rem] text-[12px] leading-snug text-white/85 sm:mt-2.5 sm:text-[13px]">{claim}</p>

          <div className="mt-3 flex flex-wrap gap-2 sm:mt-3.5 sm:gap-2.5">
            <Link
              href="/societa"
              className="inline-flex items-center justify-center gap-1 rounded-md bg-[#009dff] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#001428] shadow-[0_6px_24px_-8px_rgba(0,157,255,0.65)] transition hover:bg-[#33b0ff] sm:px-5 sm:py-2.5 sm:text-[10px]"
            >
              Scopri la società
              <span aria-hidden className="text-[11px] font-black">
                ›
              </span>
            </Link>
            <Link
              href="/attivita-di-base"
              className="inline-flex items-center justify-center gap-1 rounded-md border-2 border-white/95 bg-transparent px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/10 sm:px-5 sm:py-2.5 sm:text-[10px]"
            >
              Attività di Base
              <span aria-hidden className="text-[11px] font-black">
                ›
              </span>
            </Link>
          </div>
        </div>

        <div className="relative h-[min(200px,36%)] min-h-[130px] shrink-0 overflow-hidden rounded-lg lg:z-10 lg:h-auto lg:min-h-0 lg:flex-1 lg:min-w-0 lg:rounded-none lg:rounded-l-2xl">
          <div className="absolute inset-0">
            <Image
              src="/hero-comun-nuovo.jpg"
              alt={`Squadra e gruppo ${clubNameFormal}`}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="object-cover object-[50%_38%] brightness-[1.08] contrast-[1.12] saturate-[1.06] sm:object-[52%_36%] lg:object-[48%_32%] xl:object-[46%_30%]"
            />
            {/* Tinta navy più leggera: il soggetto resta leggibile */}
            <div
              className="pointer-events-none absolute inset-0 bg-[#001b3d]/38 mix-blend-multiply"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#001b3d]/32 via-[#002a56]/18 to-[#001428]/28" aria-hidden />
            {/* Sfumatura verso sinistra: fusione con il blocco testo */}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#001b3d_0%,rgba(0,27,61,0.9)_16%,rgba(0,27,61,0.38)_40%,rgba(0,27,61,0.06)_66%,transparent_88%)] sm:bg-[linear-gradient(90deg,#001b3d_0%,rgba(0,27,61,0.88)_14%,rgba(0,27,61,0.32)_38%,rgba(0,27,61,0.04)_62%,transparent_86%)] lg:bg-[linear-gradient(90deg,#001b3d_0%,rgba(0,27,61,0.82)_12%,rgba(0,27,61,0.28)_34%,rgba(0,27,61,0.03)_56%,transparent_92%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,220px)] bg-gradient-to-r from-[#001b3d] to-transparent sm:w-[min(100%,260px)] lg:w-[min(100%,320px)]"
              aria-hidden
            />
            {/* Glow / blue lighting dietro al soggetto (dopo le tinte, lift locale a destra) */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_78%_at_66%_38%,rgba(0,157,255,0.52)_0%,rgba(56,189,248,0.22)_36%,transparent_68%),radial-gradient(ellipse_40%_52%_at_82%_50%,rgba(125,211,252,0.38)_0%,transparent_58%)] mix-blend-soft-light"
              aria-hidden
            />
            <div
              className="hero-home-diagonals-soft pointer-events-none absolute inset-y-0 right-0 w-[min(100%,520px)] opacity-45"
              aria-hidden
            />
            <div
              className="hero-home-diagonals pointer-events-none absolute inset-y-0 right-0 w-full max-w-[min(100%,480px)] opacity-50"
              aria-hidden
            />
            <div className="hero-home-light-leak pointer-events-none absolute inset-0" aria-hidden />
            <div
              className="pointer-events-none absolute -bottom-6 -right-6 h-[min(100%,420px)] w-[min(100%,440px)] rounded-full bg-[#009dff]/38 blur-[88px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-[-4%] top-[6%] h-[48%] w-[42%] rounded-full bg-[#7dd3fc]/26 blur-[64px]"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[#003f8f]/6 mix-blend-soft-light" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
