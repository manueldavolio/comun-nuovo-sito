/** Settore giovanile — categorie e testi */

export type YouthCategory = {
  slug: string;
  title: string;
  ageHint: string;
  paragraphs: string[];
};

export const youthIntro = {
  title: "Crescere giocando, imparare competendo",
  lead:
    "Il settore giovanile dell’ASD Comun Nuovo unisce divertimento, educazione e valori. Ogni allenamento è un’occasione per sviluppare responsabilità, rispetto e spirito di squadra.",
};

export const youthCategories: YouthCategory[] = [
  {
    slug: "esordienti",
    title: "Esordienti",
    ageHint: "U13–U14 (indicativa)",
    paragraphs: [
      "Un momento di passaggio verso il calcio più strutturato, con attenzione alla gestione del carico e alla varietà di ruoli.",
      "Lavoriamo su decisioni di gioco, comunicazione in campo e autonomia, sempre con il supporto di tecnici qualificati.",
    ],
  },
  {
    slug: "pulcini",
    title: "Pulcini",
    ageHint: "U11–U12 (indicativa)",
    paragraphs: [
      "Età in cui consolidare le basi motorie e la relazione con la palla, attraverso giochi e situazioni semplici ma stimolanti.",
      "Priorità al piacere di giocare insieme, al fair play e al rispetto di compagni e avversari.",
    ],
  },
  {
    slug: "primi-calci",
    title: "Primi Calci",
    ageHint: "U9–U10 (indicativa)",
    paragraphs: [
      "Percorsi guidati per scoprire coordinazione, spazio e tempi di gioco in gruppi ridotti.",
      "Genitori e società collaborano per un ambiente sereno, dove l’errore è parte del percorso di apprendimento.",
    ],
  },
  {
    slug: "scuola-calcio",
    title: "Scuola Calcio",
    ageHint: "U6–U8 (indicativa)",
    paragraphs: [
      "Primo contatto organizzato con il calcio: movimento, socializzazione e piccoli obiettivi quotidiani.",
      "Attività ludico-motorie pensate per stimolare curiosità e sicurezza di sé, senza pressioni di risultato.",
    ],
  },
];
