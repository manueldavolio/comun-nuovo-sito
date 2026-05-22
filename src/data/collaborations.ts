export const collaborationsHero = {
  eyebrow: "Rete e territorio",
  title: "COLLABORAZIONI",
  subtitle: "Insieme per crescere, dentro e fuori dal campo.",
};

export const collaborationsIntro =
  "A.S.D. Comun Nuovo collabora con realtà sportive, formative e organizzative per offrire ai propri tesserati esperienze, crescita e opportunità di alto livello.";

export type CollaborationCategoryIcon =
  | "sport"
  | "school"
  | "events"
  | "inclusion"
  | "training";

export type CollaborationCategory = {
  id: string;
  icon: CollaborationCategoryIcon;
  title: string;
  description: string;
};

export const collaborationCategories: CollaborationCategory[] = [
  {
    id: "sport",
    icon: "sport",
    title: "Collaborazioni sportive",
    description:
      "Gemellaggi, tornei amichevoli e progetti condivisi con altre società per arricchire l’esperienza agonistica e formativa dei nostri atleti.",
  },
  {
    id: "school",
    icon: "school",
    title: "Scuole e territorio",
    description:
      "Partnership con istituti scolastici e realtà locali per promuovere movimento, fair play e legame tra scuola, famiglia e mondo dello sport.",
  },
  {
    id: "events",
    icon: "events",
    title: "Eventi e tornei",
    description:
      "Organizzazione e partecipazione a manifestazioni, rassegne e giornate dedicate per avvicinare le famiglie al calcio e al territorio.",
  },
  {
    id: "inclusion",
    icon: "inclusion",
    title: "Inclusione sociale",
    description:
      "Progetti aperti a tutti, con attenzione alle differenze e al benessere di ogni ragazzo, per uno sport accessibile e accogliente.",
  },
  {
    id: "training",
    icon: "training",
    title: "Formazione tecnica",
    description:
      "Stage, aggiornamenti e momenti di confronto per allenatori e staff, al servizio della crescita professionale e sportiva del club.",
  },
];

export type CollaborationPartner = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  isLogoPlaceholder?: boolean;
};

export const collaborationPartnersSection = {
  title: "Partner e collaborazioni",
  subtitle:
    "Realtà con cui condividiamo tornei, formazione e progetti per valorizzare il percorso dei nostri atleti.",
};

export const collaborationPartners: CollaborationPartner[] = [
  {
    id: "bergamo-tornei",
    name: "Bergamo Tornei",
    description:
      "Organizzazione di tornei e rassegne calcistiche sul territorio bergamasco, con eventi dedicati alle categorie giovanili.",
    logoUrl: "/bergamo-tornei.jpg",
  },
  {
    id: "asi-comitato-bergamo",
    name: "ASI Comitato Provinciale Bergamo",
    description:
      "Ente di promozione sportiva per progetti, iniziative e coordinamento di attività a livello provinciale.",
    logoUrl: "/asi-bergamo.jpeg",
  },
  {
    id: "crescere-portieri",
    name: "Crescere Portieri",
    description:
      "Percorsi specializzati per la crescita tecnica e mentale dei portieri, con stage e momenti di confronto dedicati.",
    logoUrl: "/crescere-portiere.png",
  },
  {
    id: "goleador-cup",
    name: "Goleador Cup",
    description:
      "Torneo e manifestazione dedicata al calcio giovanile, con giornate di gioco, aggregazione e spirito di squadra.",
    logoUrl: "/goleador-cup.png",
  },
  {
    id: "fonzies-league",
    name: "Fonzies League",
    description:
      "Rassegna sportiva che unisce competizione e divertimento, con eventi pensati per squadre e famiglie.",
    logoUrl: "/fonzies-league.jpg",
  },
  {
    id: "gazzetta-football-league",
    name: "Gazzetta Football League",
    description:
      "Lega e campionato calcistico che offre struttura agonistica e visibilità a squadre e atleti del territorio.",
    logoUrl: "/gazzetta-football-league.jpg",
  },
  {
    id: "futuri-campioni",
    name: "Futuri Campioni",
    description:
      "Progetti formativi e iniziative per accompagnare i giovani talenti nello sviluppo sportivo e personale.",
    logoUrl: "/images/sponsors/placeholder.svg",
    isLogoPlaceholder: true,
  },
];

export const collaborationsBecomeCta = {
  title: "Vuoi collaborare con noi?",
  subtitle:
    "Scuole, associazioni, enti e aziende: contattaci per costruire insieme progetti educativi e sportivi.",
  buttonLabel: "Contatti",
  href: "/contatti",
};
