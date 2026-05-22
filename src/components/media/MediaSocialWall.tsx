import Link from "next/link";
import { contacts } from "@/data/site";

function SocialInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SocialYouTube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: contacts.instagram,
    icon: SocialInstagram,
    description: "Stories, foto e aggiornamenti quotidiani.",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: contacts.youtube,
    icon: SocialYouTube,
    description: "Video ufficiali, highlights e interviste.",
  },
] as const;

export function MediaSocialWall() {
  return (
    <section className="scroll-mt-24" id="social">
      <div className="relative overflow-hidden rounded-3xl border border-sky-200/60 bg-gradient-to-br from-[#001b3d] via-[#002a56] to-[#003f8f] px-6 py-12 text-white shadow-[0_32px_80px_-40px_rgba(0,27,61,0.55)] sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 hero-home-diagonals"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#009dff]">Resta connesso</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] uppercase tracking-wide">
            Seguici sui social
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sky-100/88 sm:text-base">
            Non perdere gol, allenamenti ed eventi: segui il biancoazzurro su Instagram e YouTube.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-5">
            {socialLinks.map(({ id, label, href, icon: Icon, description }) => (
              <Link
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-left backdrop-blur-sm transition hover:border-[#009dff]/50 hover:bg-white/15 sm:px-6 sm:py-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#009dff] text-[#001428] transition group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-lg uppercase tracking-wide">{label}</span>
                  <span className="mt-0.5 block text-xs text-sky-100/75">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
