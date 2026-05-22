import Link from "next/link";
import { contacts } from "@/data/site";
import { SocialInstagram, SocialYouTube } from "@/components/contact/ContactSocialIcons";

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

export function ContactSocialSection() {
  return (
    <section className="scroll-mt-24" id="social" aria-labelledby="contact-social-title">
      <div className="relative overflow-hidden rounded-3xl border border-sky-200/60 bg-gradient-to-br from-[#001b3d] via-[#002a56] to-[#003f8f] px-6 py-12 text-white shadow-[0_32px_80px_-40px_rgba(0,27,61,0.55)] sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 hero-home-diagonals"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#009dff]">
            Resta connesso
          </p>
          <h2
            id="contact-social-title"
            className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] uppercase tracking-wide"
          >
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
