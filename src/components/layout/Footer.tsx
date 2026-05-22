import Image from "next/image";
import Link from "next/link";
import { claim, clubNameFormal, contacts, legal } from "@/data/site";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Società", href: "/societa" },
  { label: "News", href: "/news" },
  { label: "Contatti", href: "/contatti" },
  { label: "Privacy Policy", href: "/contatti" },
  { label: "Cookie Policy", href: "/contatti" },
];

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

function IconMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21c-4.418-4.05-6.5-7.295-6.5-10.14A4.36 4.36 0 0 1 9.864 6.5 4.36 4.36 0 0 1 12 7.295 4.36 4.36 0 0 1 14.136 6.5 4.36 4.36 0 0 1 18.5 10.86C18.5 13.705 16.418 16.95 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 6h16v12H4V6Zm0 0 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.5 4h3l1.5 4-2 1.5c1.2 2.4 3.1 4.3 5.5 5.5L18 13l4 1.5v3a2 2 0 0 1-2.2 2A18 18 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#001b3d] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8">
          <div className="min-w-0">
            <Link href="/" className="inline-flex max-w-full items-start gap-3 transition-opacity duration-200 hover:opacity-90">
              <Image
                src="/logo.png"
                alt={`Logo ${clubNameFormal}`}
                width={56}
                height={56}
                unoptimized
                className="h-[52px] w-auto shrink-0 object-contain sm:h-14"
              />
              <span className="min-w-0">
                <span className="block font-display text-[0.95rem] uppercase leading-tight tracking-[0.11em] text-white sm:text-base">
                  {clubNameFormal}
                </span>
                <span className="mt-1 block max-w-xs text-[12px] leading-snug text-white/72">{claim}</span>
              </span>
            </Link>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#009dff]">Contatti</p>
            <ul className="mt-2 space-y-2 text-[12px] leading-snug text-white/86">
              <li className="flex gap-2">
                <IconMap className="mt-0.5 h-4 w-4 shrink-0 text-[#009dff]" />
                <span>{legal.address}</span>
              </li>
              <li className="flex gap-2">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-[#009dff]" />
                <a href={`mailto:${contacts.email}`} className="break-all font-medium hover:text-white">
                  {contacts.email}
                </a>
              </li>
              <li className="flex gap-2">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#009dff]" />
                <a href={`tel:${contacts.phoneTel}`} className="font-medium hover:text-white">
                  {contacts.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#009dff]">Collegamenti</p>
            <ul className="mt-2 grid grid-cols-1 gap-y-1 text-[12px]">
              {footerLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-white/82 transition-colors duration-200 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#009dff]">Seguici</p>
            <div className="mt-2 flex gap-2">
              <a
                href={contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/18 bg-white/5 text-white transition-colors duration-200 hover:border-[#009dff]/55 hover:bg-white/10"
                aria-label="Instagram"
              >
                <SocialInstagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href={contacts.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/18 bg-white/5 text-white transition-colors duration-200 hover:border-[#009dff]/55 hover:bg-white/10"
                aria-label="YouTube"
              >
                <SocialYouTube className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/12 pt-6 text-[11px] leading-snug text-white/58">
          <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6">
            <p className="shrink-0 font-semibold uppercase tracking-wide text-white/88">{clubNameFormal}</p>
            <p className="min-w-0 flex-1 text-center text-[10px] text-white/55 lg:text-[11px]">
              C.F. e P.IVA {legal.fiscalCode} · Sede legale: {legal.legalSeat}
            </p>
            <p className="shrink-0 text-white/45 lg:text-right">
              © {year} {clubNameFormal}. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
