import type { NewsCategory, NewsItem } from "@/types/site";
import { NEWS_CATEGORIES } from "@/types/site";

/** Elenco statico — sostituibile con fetch CMS / database */
export const newsList: NewsItem[] = [
  {
    slug: "ritiro-estivo-2026",
    title: "Ritiro estivo: date e programma ufficiale",
    excerpt:
      "La prima squadra si prepara alla nuova stagione con una settimana intensa di lavoro tecnico, atletico e amichevoli di prestigio.",
    date: "2026-05-02",
    category: "Prima Squadra",
    image: "/images/news/placeholder-1.svg",
    featured: true,
    content: [
      "La prima squadra si ritroverà per una settimana di lavoro tecnico e atletico, con sessioni al mattino e al pomeriggio in struttura dedicata.",
      "Sono previste due amichevoli contro avversarie di categoria per testare automatismi, pressing e soluzioni su calcio piazzato.",
      "Lo staff medico effettuerà i controlli pre-stagionali; i dettagli logistici sono stati comunicati ai giocatori via gruppo squadra.",
      "I tifosi potranno seguire aggiornamenti quotidiani sui canali social ufficiali della società.",
    ],
    gallery: [
      { id: "r1", src: "/images/gallery/placeholder-1.svg", alt: "Allenamento ritiro" },
      { id: "r2", src: "/images/gallery/placeholder-2.svg", alt: "Gruppo squadra" },
      { id: "r3", src: "/images/gallery/placeholder-3.svg", alt: "Staff tecnico" },
    ],
  },
  {
    slug: "vittoria-femminile-derby",
    title: "Femminile: vittoria di carattere nel derby",
    excerpt:
      "Le biancoazzurre conquistano tre punti fondamentali con una prestazione solida in fase difensiva e un gol nel finale.",
    date: "2026-04-28",
    category: "Femminile",
    image: "/images/news/placeholder-2.svg",
    featured: true,
    content: [
      "Una partenza conservativa ha lasciato spazio all'avversaria nei primi venti minuti, ma la squadra ha trovato equilibrio grazie al pressing alto.",
      "Il gol decisivo arriva al 78' su azione corale: cross dalla fascia e deviazione vincente in area.",
      "La classifica si accorcia in zona playoff: prossimo impegno in trasferta domenica prossima.",
    ],
  },
  {
    slug: "open-day-scuola-calcio",
    title: "Open day Scuola Calcio: porte aperte alle famiglie",
    excerpt:
      "Un pomeriggio dedicato ai più piccoli: prove gratuite, staff presente e informazioni su iscrizioni e percorsi formativi.",
    date: "2026-04-18",
    category: "Attività di Base",
    image: "/images/news/placeholder-3.svg",
    content: [
      "L'open day è pensato per bambini e bambine che vogliono avvicinarsi al mondo del calcio in modo ludico e sicuro.",
      "Saranno organizzate stazioni motorie e piccoli tornei a tema, con gruppi omogenei per età.",
      "Per partecipare è consigliata la prenotazione tramite email o messaggio Instagram.",
    ],
  },
  {
    slug: "festa-chiusura-stagione",
    title: "Festa di fine stagione: appuntamento al campo",
    excerpt:
      "Sabato 10 maggio torna la festa biancoazzurra con giochi, consegna premi e momento conviviale per famiglie e tesserati.",
    date: "2026-04-12",
    category: "Eventi",
    image: "/images/news/placeholder-4.svg",
    content: [
      "La società organizza una giornata aperta a tutti i settori: dalla Scuola Calcio alle giovanili, fino alla prima squadra.",
      "Saranno presenti food truck, area photo e intrattenimento per i più piccoli.",
      "L'ingresso è gratuito; in caso di maltempo il programma si sposterà al coperto secondo comunicazione ufficiale.",
    ],
    gallery: [
      { id: "f1", src: "/images/gallery/placeholder-4.svg", alt: "Festa stagione precedente" },
      { id: "f2", src: "/images/gallery/placeholder-5.svg", alt: "Premiazioni giovanili" },
    ],
  },
  {
    slug: "gemellaggio-con-societa-amica",
    title: "Gemellaggio sportivo con una società amica",
    excerpt:
      "Doppio impegno amichevole e scambio di esperienze tra staff tecnici per arricchire il percorso dei ragazzi del settore giovanile.",
    date: "2026-04-02",
    category: "Attività di Base",
    image: "/images/news/placeholder-1.svg",
    content: [
      "Il progetto di gemellaggio rafforza i valori del fair play e offre ai giovani un confronto stimolante fuori dal campionato.",
      "Le categorie coinvolte saranno Esordienti e Pulcini, con attività congiunte in campo e fuori campo.",
      "Ringraziamo le famiglie per il supporto logistico e l'accoglienza riservata agli ospiti.",
    ],
  },
  {
    slug: "corso-allenatori-livello-base",
    title: "Corso allenatori: nuove iscrizioni aperte",
    excerpt:
      "Opportunità di formazione per chi vuole entrare nello staff come collaboratore o allenatore di base nel settore giovanile.",
    date: "2026-03-22",
    category: "Società",
    image: "/images/news/placeholder-2.svg",
    content: [
      "La società promuove la crescita dei propri tecnici attraverso corsi federali e aggiornamenti periodici.",
      "Il percorso include moduli teorici e pratica sul campo con tutoraggio del responsabile tecnico.",
      "Per informazioni su calendario e requisiti contattare la segreteria.",
    ],
  },
];

const categorySlugMap: Record<string, NewsCategory> = {
  "prima-squadra": "Prima Squadra",
  femminile: "Femminile",
  "attivita-di-base": "Attività di Base",
  eventi: "Eventi",
  societa: "Società",
};

export function categoryToSlug(category: NewsCategory): string {
  const entry = Object.entries(categorySlugMap).find(([, c]) => c === category);
  return entry?.[0] ?? category.toLowerCase().replace(/\s+/g, "-");
}

export function slugToCategory(slug: string): NewsCategory | undefined {
  return categorySlugMap[slug];
}

export function getAllNews(): NewsItem[] {
  return [...newsList].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsList.find((n) => n.slug === slug);
}

export function getFeaturedNews(limit = 3): NewsItem[] {
  return getAllNews()
    .filter((n) => n.featured)
    .slice(0, limit);
}

export function getLatestNews(limit = 5, excludeSlug?: string): NewsItem[] {
  return getAllNews()
    .filter((n) => n.slug !== excludeSlug)
    .slice(0, limit);
}

export function getNewsByCategory(category: NewsCategory): NewsItem[] {
  return getAllNews().filter((n) => n.category === category);
}

export function getNewsCategoriesWithCount(): { category: NewsCategory; count: number; slug: string }[] {
  return NEWS_CATEGORIES.map((category) => ({
    category,
    slug: categoryToSlug(category),
    count: newsList.filter((n) => n.category === category).length,
  }));
}
