import { STAFF_CATEGORIES, type StaffCategoryName, type StaffMember } from "@/types/site";

const STAFF_PHOTOS = [
  "/images/staff/placeholder-1.svg",
  "/images/staff/placeholder-2.svg",
  "/images/staff/placeholder-3.svg",
  "/images/staff/placeholder-4.svg",
  "/images/staff/placeholder-5.svg",
  "/images/staff/placeholder-6.svg",
] as const;

function staffPhoto(index: number): string {
  return STAFF_PHOTOS[index % STAFF_PHOTOS.length];
}

export const staffHero = {
  eyebrow: "Presentiamo gli Staff",
  title: "I NOSTRI STAFF",
  subtitle: "Persone, competenze e passione al servizio dei nostri ragazzi.",
};

export const staffJoinCta = {
  title: "Vuoi entrare a far parte del nostro progetto?",
  subtitle:
    "Allenatori, collaboratori e figure di supporto: contattaci per conoscere le opportunità nel club.",
  buttonLabel: "Contatti",
  href: "/contatti",
};

export const staffMembers: StaffMember[] = [
  {
    id: "dir-1",
    name: "Pierangelo Carminati",
    role: "Direttore Sportivo",
    category: "Dirigenza",
    photo: staffPhoto(0),
    description: "Guida la visione sportiva del club e coordina il progetto agonistico.",
  },
  {
    id: "dir-2",
    name: "Beppe Nobile",
    role: "Responsabile Rapporti Società e Merchandising",
    category: "Dirigenza",
    photo: staffPhoto(1),
    description:
      "Cura i rapporti con le società sportive del territorio e coordina le attività legate al merchandising del club.",
  },
  {
    id: "dir-3",
    name: "Raffaele De Falco",
    role: "Responsabile Under 19 e Under 17",
    category: "Dirigenza",
    photo: staffPhoto(2),
    description: "Segue da vicino il percorso delle categorie giovanili d’eccellenza.",
  },
  {
    id: "dir-4",
    name: "Samuele Guarnieri",
    role: "Responsabile Settore Giovanile",
    category: "Dirigenza",
    photo: staffPhoto(3),
    description: "Coordina il progetto del settore giovanile e le categorie agonistiche del club.",
  },
  {
    id: "dir-5",
    name: "Laura Amadei",
    role: "Responsabile Campi",
    category: "Dirigenza",
    photo: staffPhoto(4),
    description:
      "Gestisce campi, strutture e organizzazione degli spazi sportivi del Centro Sportivo Comun Nuovo.",
  },
  {
    id: "dir-6",
    name: "Roberta Bonetti",
    role: "Collaboratore",
    category: "Dirigenza",
    photo: staffPhoto(5),
    description: "Collabora con la società nelle attività organizzative e di supporto al club.",
  },
  {
    id: "dir-7",
    name: "Javier Ignacio Perez",
    role: "Collaboratore",
    category: "Dirigenza",
    photo: staffPhoto(0),
    description: "Collabora con la società nelle attività organizzative e di supporto al club.",
  },
  {
    id: "dir-8",
    name: "Roberto Feruglio",
    role: "Collaboratore",
    category: "Dirigenza",
    photo: staffPhoto(1),
    description: "Collabora con la società nelle attività organizzative e di supporto al club.",
  },
  {
    id: "com-1",
    name: "Angela Pannullo",
    role: "Social Media Manager",
    category: "Comunicazione",
    photo: staffPhoto(3),
    description:
      "Gestisce i canali social del club con contenuti, aggiornamenti e dialogo con tifosi e famiglie.",
  },
  {
    id: "com-2",
    name: "Romina Sorbelli",
    role: "Addetta Stampa",
    category: "Comunicazione",
    photo: staffPhoto(4),
    description: "Si occupa dei rapporti con la stampa e della comunicazione istituzionale del club.",
  },
  {
    id: "ps-1",
    name: "Massimo Alborghetti",
    role: "Allenatore",
    category: "Prima Squadra",
    photo: staffPhoto(3),
    description: "Guida la prima squadra con metodo, attenzione al gruppo e obiettivi di crescita sportiva.",
  },
  {
    id: "ps-2",
    name: "Leonardo Scalzullo",
    role: "Collaboratore",
    category: "Prima Squadra",
    photo: staffPhoto(4),
    description: "Supporta la preparazione degli allenamenti e lo sviluppo tattico della rosa.",
  },
  {
    id: "ps-3",
    name: "Gianluca Melonari",
    role: "Collaboratore",
    category: "Prima Squadra",
    photo: staffPhoto(5),
    description: "Affianca lo staff tecnico nella gestione quotidiana del gruppo.",
  },
  {
    id: "ps-4",
    name: "Stefano Avogadri",
    role: "Preparatore Portieri",
    category: "Prima Squadra",
    photo: staffPhoto(6),
    description: "Contribuisce alla crescita tecnica e al clima di squadra.",
  },
  {
    id: "ps-5",
    name: "Giuseppe Boccia",
    role: "Collaboratore",
    category: "Prima Squadra",
    photo: staffPhoto(7),
    description: "Supporta allenamenti e partite con competenza e spirito di squadra.",
  },
  {
    id: "fem-1",
    name: "Manuel D'Avolio",
    role: "Allenatore",
    category: "Femminile",
    photo: staffPhoto(8),
    description: "Accompagna le atlete nel percorso agonistico con tecnica ed empatia.",
  },
  {
    id: "fem-2",
    name: "Roberto Paris",
    role: "Allenatore",
    category: "Femminile",
    photo: staffPhoto(9),
    description: "Affianca il progetto femminile con attenzione al gioco e alla crescita del gruppo.",
  },
  {
    id: "fem-3",
    name: "Nicole Bosio",
    role: "Coordinatrice",
    category: "Femminile",
    photo: staffPhoto(10),
    description: "Coordina organizzazione e rapporti tra staff, atlete e famiglie.",
  },
  {
    id: "u19-1",
    name: "Antonino Chinnici",
    role: "Allenatore",
    category: "Under 19",
    photo: staffPhoto(11),
    description: "Forma i ragazzi del settore giovanile d’eccellenza con equilibrio tra tecnica e carattere.",
  },
  {
    id: "u19-2",
    name: "Dario",
    role: "Vice Allenatore",
    category: "Under 19",
    photo: staffPhoto(12),
    description: "Supporta la guida tecnica e la preparazione del gruppo Under 19.",
  },
  {
    id: "u19-3",
    name: "Aldo Albergoni",
    role: "Collaboratore",
    category: "Under 19",
    photo: staffPhoto(13),
    description: "Affianca lo staff nell’allenamento e nello sviluppo dei giovani.",
  },
  {
    id: "u19-4",
    name: "Moris Agati",
    role: "Collaboratore",
    category: "Under 19",
    photo: staffPhoto(14),
    description: "Contribuisce alla crescita tecnica e relazionale della rosa.",
  },
  {
    id: "u17-1",
    name: "Giuseppe Zecchini",
    role: "Allenatore",
    category: "Under 17",
    photo: staffPhoto(15),
    description: "Valorizza le potenzialità individuali dentro un progetto di gioco collettivo.",
  },
  {
    id: "u17-2",
    name: "Aldo Albergoni",
    role: "Vice Allenatore",
    category: "Under 17",
    photo: staffPhoto(16),
    description: "Supporta la guida tecnica e l’organizzazione degli allenamenti Under 17.",
  },
  {
    id: "u17-3",
    name: "Emanuele Rota",
    role: "Collaboratore",
    category: "Under 17",
    photo: staffPhoto(17),
    description: "Affianca lo staff nella preparazione e nella crescita dei ragazzi.",
  },
  {
    id: "u15-1",
    name: "Umberto Figurilli",
    role: "Allenatore",
    category: "Under 15",
    photo: staffPhoto(18),
    description: "Costruisce le basi tecniche e relazionali per affrontare con serenità la crescita agonistica.",
  },
  {
    id: "adb-es-1",
    name: "Stefano Avogadri",
    role: "Allenatore · Esordienti",
    category: "Attività di Base",
    photo: staffPhoto(19),
    description: "Guida la categoria Esordienti con attenzione a tecnica, gioco e spirito di squadra.",
  },
  {
    id: "adb-es-2",
    name: "Leonardo Scalzullo",
    role: "Vice Allenatore · Esordienti",
    category: "Attività di Base",
    photo: staffPhoto(20),
    description: "Supporta il percorso formativo degli Esordienti in campo e fuori.",
  },
  {
    id: "adb-pu-1",
    name: "Alberto Persico",
    role: "Allenatore · Pulcini",
    category: "Attività di Base",
    photo: staffPhoto(21),
    description: "Accompagna i Pulcini con giochi, regole semplici e tanto divertimento.",
  },
  {
    id: "adb-pu-2",
    name: "Matteo Cattaneo",
    role: "Vice Allenatore · Pulcini",
    category: "Attività di Base",
    photo: staffPhoto(22),
    description: "Affianca l’allenatore nella gestione quotidiana della categoria Pulcini.",
  },
  {
    id: "adb-pc-1",
    name: "Da definire",
    role: "Allenatore · Primi Calci",
    category: "Attività di Base",
    photo: staffPhoto(23),
    description: "Figura tecnica in fase di definizione per la categoria Primi Calci.",
  },
  {
    id: "adb-sc-1",
    name: "Da definire",
    role: "Istruttore · Scuola Calcio",
    category: "Attività di Base",
    photo: staffPhoto(24),
    description: "Figura tecnica in fase di definizione per la Scuola Calcio.",
  },
];

export function getStaffByCategory(category: StaffCategoryName): StaffMember[] {
  return staffMembers.filter((m) => m.category === category);
}

export const staffCategorySections: { category: StaffCategoryName; subtitle?: string }[] =
  STAFF_CATEGORIES.map((category) => ({
    category,
    subtitle:
      category === "Dirigenza"
        ? "Le figure che guidano organizzazione, sport e rapporti istituzionali."
        : category === "Comunicazione"
          ? "Social, stampa e contenuti: il volto del club online e con i media."
          : category === "Attività di Base"
            ? "Il cuore formativo per i più piccoli e le prime esperienze con il pallone."
            : undefined,
  }));
