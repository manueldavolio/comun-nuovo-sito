"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/**
 * Header e footer del sito pubblico. Le route /admin (pannello interno)
 * vengono renderizzate senza chrome pubblico.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
