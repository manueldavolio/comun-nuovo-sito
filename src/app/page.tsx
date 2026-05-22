import { Hero } from "@/components/home/Hero";
import { HomeCards } from "@/components/home/HomeCards";
import { HomeStatsBar } from "@/components/home/HomeStatsBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeStatsBar />
      <HomeCards />
    </>
  );
}
