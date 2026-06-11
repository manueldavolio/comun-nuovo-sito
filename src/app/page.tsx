import { Hero } from "@/components/home/Hero";
import { HomeCards } from "@/components/home/HomeCards";
import { HomeStatsBar } from "@/components/home/HomeStatsBar";
import { fetchSiteSettings } from "@/lib/cms";

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function HomePage() {
  const settings = await fetchSiteSettings();

  return (
    <>
      <Hero />
      <HomeStatsBar settings={settings} />
      <HomeCards />
    </>
  );
}
