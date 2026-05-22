export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Società",
    href: "/societa",
    children: [
      { label: "Storia", href: "/societa#storia" },
      { label: "Organigramma", href: "/societa#organigramma" },
      { label: "Safeguarding Policy", href: "/societa#safeguarding" },
    ],
  },
  {
    label: "Agonistica",
    href: "/prima-squadra",
    children: [
      { label: "Prima Squadra", href: "/prima-squadra" },
      { label: "Femminile", href: "/femminile" },
      { label: "Under 19", href: "/under-19" },
      { label: "Under 17", href: "/under-17" },
      { label: "Under 15", href: "/under-15" },
      { label: "Calcio a 5 C2", href: "/calcio-a-5-c2" },
    ],
  },
  {
    label: "Attività di Base",
    href: "/attivita-di-base",
    children: [
      { label: "Esordienti", href: "/attivita-di-base/esordienti" },
      { label: "Pulcini", href: "/attivita-di-base/pulcini" },
      { label: "Primi Calci", href: "/attivita-di-base/primi-calci" },
      { label: "Scuola Calcio", href: "/attivita-di-base/scuola-calcio" },
    ],
  },
  { label: "Staff", href: "/staff" },
  { label: "News", href: "/news" },
  { label: "Media", href: "/media" },
  { label: "Sponsor", href: "/sponsor" },
  { label: "Merchandising", href: "/merchandising" },
  { label: "Collaborazioni", href: "/collaborazioni" },
];

export const teamNav = (base: string) => [
  { label: "Rosa", href: `${base}/rosa` },
  { label: "Risultati", href: `${base}/risultati` },
  { label: "Classifica", href: `${base}/classifica` },
];
