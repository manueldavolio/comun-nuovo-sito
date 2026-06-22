"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clubLogoPath } from "@/data/site";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pagine", label: "Pagine" },
  { href: "/admin/giocatori", label: "Giocatori" },
  { href: "/admin/staff", label: "Staff" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/sponsor", label: "Sponsor" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/ordini-merchandising", label: "Ordini merchandising" },
];

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"loading" | "ready" | "unconfigured">(() =>
    getSupabaseBrowserClient() ? "loading" : "unconfigured",
  );
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setEmail(data.session.user.email ?? null);
        setStatus("ready");
      } else {
        router.replace("/admin/login");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        setEmail(session.user.email ?? null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    if (supabase) await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (status === "unconfigured") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="max-w-md rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-800">
          Supabase non configurato. Imposta <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code> per usare il pannello admin.
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-[#4a5568]">Verifica accesso…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[#001b3d] text-white">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <Image src={clubLogoPath} alt="ASD Comun Nuovo" width={40} height={40} className="h-10 w-10 object-contain" />
          <div className="min-w-0">
            <p className="font-display text-xl leading-none tracking-wide">Comun Nuovo</p>
            <p className="text-[11px] uppercase tracking-wider text-white/50">Pannello Admin</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-[#009dff] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          {email ? <p className="mb-2 truncate text-xs text-white/50" title={email}>{email}</p> : null}
          <div className="flex items-center gap-3 text-xs">
            <Link href="/" className="text-white/70 hover:text-white" target="_blank">
              Vai al sito ↗
            </Link>
            <button type="button" onClick={handleLogout} className="font-semibold text-red-300 hover:text-red-200">
              Esci
            </button>
          </div>
        </div>
      </aside>

      <main className="ml-60 min-h-screen flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
