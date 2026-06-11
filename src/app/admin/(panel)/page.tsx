"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { countRows } from "@/lib/admin";

type DashboardCard = {
  href: string;
  label: string;
  description: string;
  table: string;
};

const CARDS: DashboardCard[] = [
  { href: "/admin/giocatori", label: "Giocatori", description: "Rose delle squadre: foto, ruoli e numeri", table: "SitePlayer" },
  { href: "/admin/staff", label: "Staff", description: "Dirigenza, allenatori e collaboratori", table: "SiteStaffMember" },
  { href: "/admin/news", label: "News", description: "Articoli pubblicati e bozze", table: "SiteNews" },
  { href: "/admin/sponsor", label: "Sponsor", description: "Loghi, categorie e link", table: "SiteSponsor" },
  { href: "/admin/media", label: "Album foto", description: "Gallerie fotografiche del sito", table: "SiteGalleryAlbum" },
  { href: "/admin/media", label: "Video", description: "Video YouTube in pagina Media", table: "SiteVideo" },
];

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      CARDS.map(async (card) => [card.table, await countRows(card.table)] as const),
    ).then((entries) => {
      if (!cancelled) setCounts(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#4a5568]">
          Gestisci i contenuti del sito ASD Comun Nuovo. Le modifiche sono visibili sul sito pubblico.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={`${card.href}-${card.label}`}
            href={card.href}
            className="group rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#4a5568]">{card.label}</p>
              <span className="rounded-lg bg-[#f3f7fb] px-2 py-1 text-xs font-bold text-[#003f8f]">
                {counts[card.table] ?? "—"}
              </span>
            </div>
            <p className="mt-3 text-sm text-[#001b3d]">{card.description}</p>
            <p className="mt-4 text-xs font-semibold text-[#009dff] group-hover:underline">Gestisci →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
