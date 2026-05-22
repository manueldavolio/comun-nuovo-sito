/** Attività di Base — testi e categorie */

export type BaseActivityCategory = {
  slug: string;
  title: string;
  ageHint: string;
  cardDescription: string;
  heroSubtitle: string;
  description: string[];
  staffPlaceholder: { role: string; name: string }[];
  schedulePlaceholder: { label: string; detail: string }[];
  objectives: string[];
};

export const baseActivitiesLandingHero = {
  eyebrow: "Attività di Base",
  title: "Ogni bambino conta",
  subtitle:
    "Un percorso sportivo fatto di crescita, divertimento e formazione in un ambiente sano e professionale.",
  image: "/images/base-activities/hero-visual.svg",
  imageAlt: "Composizione grafica calcio giovanile — attività di base ASD Comun Nuovo",
};

export const baseActivitiesPhilosophy = [
  {
    title: "Crescita",
    description:
      "Sviluppo motorio e personale a ritmi adeguati all'età: obiettivi chiari, attenzione al processo e valorizzazione di ogni progresso.",
    icon: "growth" as const,
  },
  {
    title: "Divertimento",
    description:
      "Il piacere di giocare è al centro: attività ludiche e sfide graduali per restare motivati, sereni e curiosi settimana dopo settimana.",
    icon: "fun" as const,
  },
  {
    title: "Educazione",
    description:
      "Regole condivise, fair play e responsabilità: sul campo si imparano abitudini utili anche nella vita quotidiana e a scuola.",
    icon: "education" as const,
  },
  {
    title: "Spirito di squadra",
    description:
      "Collaborazione, ascolto e rispetto reciproco: ogni bambino impara a fare squadra prima ancora di correre verso il risultato.",
    icon: "team" as const,
  },
] as const;

export type BaseActivitiesStaffMember = {
  name: string;
  category: string;
  role: string;
  initials: string;
};

export const baseActivitiesStaff: BaseActivitiesStaffMember[] = [
  { name: "Stefano Avogadri", category: "Esordienti", role: "Allenatore", initials: "SA" },
  { name: "Alberto Persico", category: "Pulcini", role: "Allenatore", initials: "AP" },
  { name: "Allenatore da definire", category: "Primi Calci", role: "Allenatore", initials: "PC" },
  { name: "Istruttore da definire", category: "Scuola Calcio", role: "Istruttore", initials: "SC" },
];

export const baseActivitiesFinalCta = {
  title: "Entra nella famiglia biancoazzurra",
  description:
    "Contattaci per ricevere tutte le informazioni sulla prossima stagione sportiva.",
};

/** @deprecated Usare baseActivitiesLandingHero — mantenuto per compatibilità interna */
export const baseActivitiesHero = {
  title: "ATTIVITÀ DI BASE",
  subtitle: "Il calcio come crescita, gioco e appartenenza.",
};

export const baseActivitiesIntro =
  "Le Attività di Base dell’ASD Comun Nuovo sono il cuore formativo del nostro progetto: un percorso che unisce gioco, divertimento e educazione, con attenzione al rispetto, alla crescita dei bambini e al rapporto costante con le famiglie.";

export const baseActivityCategories: BaseActivityCategory[] = [
  {
    slug: "scuola-calcio",
    title: "Scuola Calcio",
    ageHint: "U6–U8 (indicativa)",
    cardDescription:
      "Primo contatto organizzato con il calcio: movimento, socializzazione e obiettivi quotidiani senza pressioni.",
    heroSubtitle: "Il primo passo nel mondo del calcio.",
    description: [
      "La Scuola Calcio è il primo contatto organizzato con il calcio: movimento, socializzazione e piccoli obiettivi quotidiani.",
      "Attività ludico-motorie pensate per stimolare curiosità e sicurezza di sé, senza pressioni di risultato e con massima attenzione al benessere dei bambini.",
    ],
    staffPlaceholder: [{ role: "Istruttore", name: "Da definire" }],
    schedulePlaceholder: [
      { label: "Allenamenti", detail: "Sabato mattina — orario da confermare" },
      { label: "Campo", detail: "Centro sportivo Comun Nuovo" },
      { label: "Open day", detail: "Date promozionali — da annunciare" },
    ],
    objectives: [
      "Favorire motricità generale e primi schemi di gioco a tema.",
      "Socializzare in un contesto sportivo allegro e inclusivo.",
      "Avvicinare bambini e famiglie alla vita del club.",
      "Creare abitudini positive verso movimento e rispetto delle regole.",
    ],
  },
  {
    slug: "primi-calci",
    title: "Primi Calci",
    ageHint: "U9–U10 (indicativa)",
    cardDescription:
      "Coordinazione, spazio e tempi di gioco in gruppi ridotti, con genitori e società al fianco dei bambini.",
    heroSubtitle: "Scoprire il calcio con curiosità e sicurezza.",
    description: [
      "I Primi Calci propongono percorsi guidati per scoprire coordinazione, spazio e tempi di gioco in gruppi ridotti.",
      "Genitori e società collaborano per un ambiente sereno, dove l’errore è parte del percorso e ogni piccolo progresso viene valorizzato.",
    ],
    staffPlaceholder: [{ role: "Allenatore", name: "Da definire" }],
    schedulePlaceholder: [
      { label: "Allenamenti", detail: "Martedì e venerdì — orario da confermare" },
      { label: "Campo", detail: "Centro sportivo Comun Nuovo" },
      { label: "Attività extra", detail: "Eventi sociali — date da comunicare" },
    ],
    objectives: [
      "Sperimentare movimenti di base e primi gesti tecnici con la palla.",
      "Comprendere spazio, direzione e collaborazione in mini-partite.",
      "Costruire fiducia in sé e nel gruppo senza pressione sul risultato.",
      "Avviare un dialogo costante con le famiglie sul percorso sportivo.",
    ],
  },
  {
    slug: "pulcini",
    title: "Pulcini",
    ageHint: "U11–U12 (indicativa)",
    cardDescription:
      "Basi motorie e relazione con la palla: giochi stimolanti, fair play e piacere di giocare insieme.",
    heroSubtitle: "Gioco, movimento e spirito di squadra.",
    description: [
      "I Pulcini sono l’età in cui consolidare le basi motorie e la relazione con la palla, attraverso giochi e situazioni semplici ma stimolanti.",
      "Priorità al piacere di giocare insieme, al rispetto di compagni e avversari e alla collaborazione con le famiglie per un ambiente sereno.",
    ],
    staffPlaceholder: [
      { role: "Allenatore", name: "Alberto Persico" },
      { role: "Vice Allenatore", name: "Matteo Cattaneo" },
    ],
    schedulePlaceholder: [
      { label: "Allenamenti", detail: "Lunedì e mercoledì — orario da confermare" },
      { label: "Campo", detail: "Centro sportivo Comun Nuovo" },
      { label: "Tornei amatoriali", detail: "Calendario in definizione" },
    ],
    objectives: [
      "Migliorare coordinazione, equilibrio e capacità espressive con la palla.",
      "Imparare regole essenziali e rispetto degli avversari.",
      "Favorire socializzazione e collaborazione in gruppo.",
      "Mantenere alta la motivazione attraverso attività ludiche.",
    ],
  },
  {
    slug: "esordienti",
    title: "Esordienti",
    ageHint: "U13–U14 (indicativa)",
    cardDescription:
      "Passaggio verso un calcio più strutturato: decisioni di gioco, comunicazione e autonomia con supporto tecnico.",
    heroSubtitle: "Verso il calcio organizzato, con equilibrio e crescita.",
    description: [
      "La categoria Esordienti accompagna i ragazzi in un momento di transizione verso il calcio più strutturato, mantenendo priorità su divertimento, rispetto e crescita personale.",
      "Gli allenamenti lavorano su gestione del carico, varietà di ruoli, decisioni in campo e spirito di squadra, con obiettivi condivisi alle famiglie e al territorio.",
    ],
    staffPlaceholder: [
      { role: "Allenatore", name: "Stefano Avogadri" },
      { role: "Vice Allenatore", name: "Leonardo Scalzullo" },
    ],
    schedulePlaceholder: [
      { label: "Allenamenti", detail: "Martedì e giovedì — orario da confermare" },
      { label: "Campo", detail: "Centro sportivo Comun Nuovo" },
      { label: "Partite", detail: "Calendario campionato in aggiornamento" },
    ],
    objectives: [
      "Consolidare le basi tecniche e tattiche in situazioni di gioco reali.",
      "Sviluppare autonomia nelle scelte e comunicazione tra compagni.",
      "Gestire competizione e risultato con equilibrio e fair play.",
      "Rafforzare il legame con il club e le famiglie attraverso momenti condivisi.",
    ],
  },
];

export function getBaseActivityCategory(slug: string): BaseActivityCategory | undefined {
  return baseActivityCategories.find((c) => c.slug === slug);
}
