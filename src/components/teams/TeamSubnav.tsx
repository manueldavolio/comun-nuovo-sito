"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { teamNav } from "@/config/navigation";

type TeamSubnavProps = {
  basePath: string;
  teamTitle: string;
  season: string;
};

export function TeamSubnav({ basePath, teamTitle, season }: TeamSubnavProps) {
  const pathname = usePathname();
  const items = teamNav(basePath);

  return (
    <div className="border-b border-white/10 bg-[#001b3d]/95">
      <div className="site-container flex flex-col gap-4 py-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#009dff]">Squadra</p>
          <h1 className="mt-1 font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
            {teamTitle}
          </h1>
          <p className="mt-1 text-sm text-white/72">Stagione {season}</p>
        </div>
        <nav className="flex flex-wrap gap-2">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  active
                    ? "border-[#009dff] bg-[#009dff]/20 text-white shadow-[0_4px_16px_-4px_rgba(0,157,255,0.35)]"
                    : "border-white/12 bg-white/5 text-white/80 hover:border-[#009dff]/50 hover:bg-[#009dff]/15 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
