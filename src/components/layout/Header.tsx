"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { mainNav } from "@/config/navigation";
import { clubNameFormal, contacts, gestionaleUrl } from "@/data/site";

function SocialIconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SocialIconYouTube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/** Top bar 28px + navbar bianca 88px */
const MOBILE_NAV_TOP = "top-[116px]";

const navLinkClass =
  "shrink-0 whitespace-nowrap rounded-md px-2 py-2 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#001b3d]/92 transition-colors duration-200 hover:bg-[#f3f7fb] hover:text-[#001b3d] xl:px-2.5 xl:text-[9.5px] 2xl:text-[10px]";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const closeMobileNav = () => {
    setOpen(false);
    setMobileExpanded(null);
  };

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 shadow-[0_1px_0_rgba(0,27,61,0.08),0_4px_16px_-8px_rgba(0,27,61,0.12)] ${open ? "z-[9999]" : "z-[100]"}`}
    >
      <div className="bg-[#001b3d] text-white">
        <div className="mx-auto flex h-7 max-w-[1420px] items-center justify-end gap-0.5 px-3 sm:px-5 lg:px-6">
          <a
            href={contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-7 w-8 items-center justify-center text-white/85 transition-colors duration-200 hover:text-white"
            aria-label="Instagram"
          >
            <SocialIconInstagram className="h-[17px] w-[17px]" />
          </a>
          <a
            href={contacts.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-7 w-8 items-center justify-center text-white/85 transition-colors duration-200 hover:text-white"
            aria-label="YouTube"
          >
            <SocialIconYouTube className="h-[17px] w-[17px]" />
          </a>
        </div>
      </div>

      <div className="border-b border-[#e8ecf0] bg-white">
        <div className="mx-auto grid h-[88px] max-w-[1420px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-0 px-2 sm:gap-x-3 sm:px-4 lg:gap-x-4 lg:px-5">
          <Link
            href="/"
            title={clubNameFormal}
            className="group flex min-w-0 shrink-0 items-center gap-3 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009dff]/50"
            onClick={() => closeMobileNav()}
          >
            <Image
              src="/logo.png"
              alt={`Logo ${clubNameFormal}`}
              width={60}
              height={60}
              priority
              unoptimized
              className="h-[58px] w-auto max-h-[58px] shrink-0 object-contain"
            />
            <span className="flex min-w-0 flex-col justify-center leading-none">
              <span className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#001b3d]">
                A.S.D.
              </span>
              <span className="mt-0.5 font-display text-[0.98rem] font-normal uppercase tracking-[0.11em] text-[#001b3d] sm:text-[1.06rem]">
                COMUN NUOVO
              </span>
            </span>
          </Link>

          <nav
            className="hidden min-h-0 min-w-0 flex-nowrap items-center justify-center gap-x-0.5 overflow-visible px-0.5 lg:flex xl:gap-x-1"
            aria-label="Principale"
          >
            {mainNav.map((item) =>
              item.children ? (
                <NavDropdown key={item.href} item={item} />
              ) : (
                <Link key={item.href} href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-2.5">
            <a
              href={gestionaleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center rounded-md border border-[#003f8f] bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-[#003f8f] transition-colors duration-200 hover:bg-[#f3f7fb] md:inline-flex xl:text-[9.5px]"
            >
              Gestionale
            </a>
            <Link
              href="/contatti"
              className="hidden shrink-0 rounded-md bg-[#003f8f] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_4px_12px_-4px_rgba(0,63,143,0.45)] transition-colors duration-200 hover:bg-[#002f6b] md:inline-flex xl:text-[9.5px]"
            >
              Contatti
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#e8ecf0] bg-white text-[#001b3d] transition-colors duration-200 hover:border-[#003f8f]/35 hover:bg-[#f3f7fb] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              onClick={() => {
                setOpen((v) => !v);
                setMobileExpanded(null);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                {open ? (
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7H20M4 12H20M4 17H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className={`fixed inset-0 z-[9998] bg-[#001b3d]/40 backdrop-blur-[2px] lg:hidden ${MOBILE_NAV_TOP}`}
            aria-label="Chiudi menu"
            onClick={() => closeMobileNav()}
          />
          <div
            id="mobile-nav"
            className={`fixed inset-x-0 bottom-0 z-[9999] flex max-h-[calc(100dvh-116px)] flex-col overflow-y-auto overscroll-contain border-t border-[#e8ecf0] bg-white pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_-8px_rgba(0,27,61,0.18)] lg:hidden ${MOBILE_NAV_TOP}`}
          >
            <nav className="mx-auto flex w-full max-w-[1420px] flex-col gap-0.5 px-4 sm:px-6" aria-label="Mobile">
              {mainNav.map((item) => (
                <div key={item.href} className="border-b border-[#e8ecf0]/90 py-1 last:border-0">
                  {item.children ? (
                    <>
                      <div className="flex items-stretch gap-0">
                        <Link
                          href={item.href}
                          className="flex min-w-0 flex-1 items-center rounded-md px-3 py-3 text-[14px] font-bold uppercase tracking-wide text-[#001b3d]"
                          onClick={() => closeMobileNav()}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="flex w-12 shrink-0 items-center justify-center rounded-md border-l border-[#e8ecf0] text-[#001b3d]/70 transition-colors duration-200 hover:bg-[#f3f7fb]"
                          aria-expanded={mobileExpanded === item.href}
                          aria-label={mobileExpanded === item.href ? `Chiudi sottomenu ${item.label}` : `Apri sottomenu ${item.label}`}
                          onClick={() => setMobileExpanded((k) => (k === item.href ? null : item.href))}
                        >
                          <span
                            className={`inline-block text-xs transition-transform ${mobileExpanded === item.href ? "rotate-180" : ""}`}
                            aria-hidden
                          >
                            ▾
                          </span>
                        </button>
                      </div>
                      {mobileExpanded === item.href ? (
                        <div className="border-t border-[#e8ecf0] bg-[#f8fafc] py-1">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="block rounded-md py-2.5 pl-5 pr-3 text-sm font-medium text-[#001b3d]/85"
                              onClick={() => closeMobileNav()}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-[14px] font-bold uppercase tracking-wide text-[#001b3d]"
                      onClick={() => closeMobileNav()}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <a
                href={gestionaleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3 mt-4 flex items-center justify-center gap-2 rounded-md border-2 border-[#003f8f] bg-white py-3.5 text-sm font-bold uppercase tracking-wider text-[#003f8f]"
              >
                Gestionale
              </a>
              <Link
                href="/contatti"
                className="mx-3 mt-3 mb-6 flex items-center justify-center rounded-md bg-[#003f8f] py-3.5 text-sm font-bold uppercase tracking-wider text-white"
                onClick={() => closeMobileNav()}
              >
                Contatti
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
