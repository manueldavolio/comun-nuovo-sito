import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Prima Squadra",
    description: "Rosa, risultati e classifica del primo team.",
    href: "/prima-squadra/rosa",
    image: "/images/home/card-prima-squadra.svg",
    imageAlt: "Illustrazione calcio — prima squadra",
  },
  {
    title: "Attività di Base",
    description: "Scuola calcio, Pulcini e percorsi formativi sul territorio.",
    href: "/attivita-di-base",
    image: "/images/home/card-settore-giovanile.svg",
    imageAlt: "Illustrazione campo — attività di base",
  },
  {
    title: "Ultime News",
    description: "Comunicati, eventi e aggiornamenti dal club.",
    href: "/news",
    image: "/images/home/card-news.svg",
    imageAlt: "Illustrazione news club",
  },
  {
    title: "Merchandising",
    description: "Abbigliamento e accessori ufficiali biancoazzurri.",
    href: "/merchandising",
    image: "/images/home/card-merchandising.svg",
    imageAlt: "Illustrazione merchandising",
  },
] as const;

export function HomeCards() {
  return (
    <section className="bg-[var(--club-page)] pb-6 pt-5 sm:pb-8 sm:pt-6">
      <div className="site-container-home">
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {cards.map((card) => (
            <article
              key={card.href}
              className="club-card-interactive group flex h-full flex-col overflow-hidden rounded-xl"
            >
              <Link href={card.href} className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#001b3d]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Link>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                <h2 className="font-display text-[0.98rem] uppercase leading-tight tracking-[0.06em] text-[#001b3d]">
                  {card.title}
                </h2>
                <p className="mt-1 text-[12px] leading-snug text-[#4a5568]">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-2 inline-flex w-fit text-[9px] font-bold uppercase tracking-[0.14em] text-[#003f8f] transition group-hover:underline"
                >
                  Scopri di più →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
