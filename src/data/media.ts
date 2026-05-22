import type {
  MediaGallerySection,
  MediaHighlight,
  YoutubeVideo,
} from "@/types/site";

export const mediaGallerySections: MediaGallerySection[] = [
  {
    id: "prima-squadra",
    title: "Prima Squadra",
    images: [
      {
        id: "ps-1",
        src: "/images/gallery/placeholder-1.svg",
        alt: "Prima squadra in campo — azione offensiva",
        span: "wide",
      },
      {
        id: "ps-2",
        src: "/images/gallery/placeholder-2.svg",
        alt: "Riscaldamento prepartita prima squadra",
      },
      {
        id: "ps-3",
        src: "/images/gallery/placeholder-3.svg",
        alt: "Esultanza dopo il gol",
        span: "tall",
      },
    ],
  },
  {
    id: "femminile",
    title: "Femminile",
    images: [
      {
        id: "fem-1",
        src: "/images/gallery/placeholder-4.svg",
        alt: "Squadra femminile in formazione",
        span: "tall",
      },
      {
        id: "fem-2",
        src: "/images/gallery/placeholder-5.svg",
        alt: "Allenamento tecnico femminile",
      },
      {
        id: "fem-3",
        src: "/images/gallery/placeholder-6.svg",
        alt: "Premiazione campionato femminile",
        span: "wide",
      },
    ],
  },
  {
    id: "attivita-di-base",
    title: "Attività di Base",
    images: [
      {
        id: "adb-1",
        src: "/images/gallery/placeholder-3.svg",
        alt: "Scuola calcio — esercizi con il pallone",
      },
      {
        id: "adb-2",
        src: "/images/gallery/placeholder-1.svg",
        alt: "Giovani atleti in allenamento",
        span: "wide",
      },
    ],
  },
  {
    id: "eventi",
    title: "Eventi",
    images: [
      {
        id: "ev-1",
        src: "/images/gallery/placeholder-5.svg",
        alt: "Torneo estivo Comun Nuovo",
        span: "wide",
      },
      {
        id: "ev-2",
        src: "/images/gallery/placeholder-2.svg",
        alt: "Festa di fine stagione",
      },
      {
        id: "ev-3",
        src: "/images/gallery/placeholder-6.svg",
        alt: "Presentazione maglie ufficiali",
        span: "tall",
      },
    ],
  },
  {
    id: "tifoseria",
    title: "Tifoseria",
    images: [
      {
        id: "tif-1",
        src: "/images/gallery/placeholder-4.svg",
        alt: "Curva biancoazzurra in trasferta",
        span: "tall",
      },
      {
        id: "tif-2",
        src: "/images/gallery/placeholder-2.svg",
        alt: "Coreografia tifosi allo stadio",
      },
      {
        id: "tif-3",
        src: "/images/gallery/placeholder-1.svg",
        alt: "Gruppo tifosi prima della partita",
        span: "wide",
      },
    ],
  },
];

/** Video YouTube ufficiali — sostituisci gli ID placeholder con contenuti reali */
export const youtubeVideos: YoutubeVideo[] = [
  {
    id: "v-featured",
    title: "Comun Nuovo — video ufficiale",
    description: "Il mondo biancoazzurro in un minuto: squadre, territorio e passione.",
    youtubeId: "6mzCVcBJXNM",
    featured: true,
  },
  {
    id: "v2",
    title: "Highlights ultima partita",
    description: "Le azioni salienti del match di campionato (placeholder).",
    youtubeId: "6mzCVcBJXNM",
    comingSoon: true,
  },
  {
    id: "v3",
    title: "Intervista post gara",
    description: "Le parole di mister e capitano dopo il fischio finale (placeholder).",
    youtubeId: "6mzCVcBJXNM",
    comingSoon: true,
  },
  {
    id: "v4",
    title: "Allenamento settimanale",
    description: "Dietro le quinte della preparazione in campo (placeholder).",
    youtubeId: "6mzCVcBJXNM",
    comingSoon: true,
  },
];

export const mediaHighlights: MediaHighlight[] = [
  {
    id: "hl-1",
    title: "Comun Nuovo vs Real Calepio",
    subtitle: "Highlights e gol della vittoria casalinga in campionato.",
    tag: "Partita",
    image: "/images/gallery/placeholder-1.svg",
    date: "2026-05-10",
  },
  {
    id: "hl-2",
    title: "Torneo Primavera Comun Nuovo",
    subtitle: "Le emozioni del torneo giovanile con oltre 20 squadre partecipanti.",
    tag: "Torneo",
    image: "/images/gallery/placeholder-5.svg",
    date: "2026-05-04",
  },
  {
    id: "hl-3",
    title: "Allenamento open day",
    subtitle: "Un mattino con la prima squadra: tecnica, tattica e spirito di squadra.",
    tag: "Allenamento",
    image: "/images/gallery/placeholder-3.svg",
    date: "2026-04-28",
  },
];
