import { foundationYear } from "@/data/site";
import type { Sponsor, SponsorTier } from "@/types/site";

/** Hero pagina sponsor */
export const sponsorHero = {
  eyebrow: "Partner",
  title: "I NOSTRI SPONSOR",
  subtitle: "Le aziende che sostengono il progetto biancoazzurro.",
};

/** Messaggio quando l'elenco partner non è ancora pubblicato */
export const sponsorsEmptyState = {
  badge: "IN AGGIORNAMENTO",
  title: "Partner in aggiornamento",
  message: "Partner e sponsor ufficiali stagione 2026/27 in aggiornamento.",
} as const;

/** Etichette categorie — ordine di visualizzazione in pagina */
export const sponsorTierSections: { tier: SponsorTier; label: string }[] = [
  { tier: "main", label: "Main Sponsor" },
  { tier: "gold", label: "Gold Sponsor" },
  { tier: "partner", label: "Partner" },
  { tier: "technical", label: "Sponsor Tecnici" },
];

/**
 * Elenco sponsor — aggiungi o modifica voci per aggiornare la pagina.
 * `logoUrl`: percorso in `public/` (es. `/images/sponsors/nome-azienda.svg`)
 * `website`: URL completo; ometti se non disponibile
 */
export const sponsors: Sponsor[] = [];

export function getSponsorsByTier(tier: SponsorTier): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier);
}

/** Sezione “Diventa sponsor” */
export const sponsorBecome = {
  title: "Diventa partner di A.S.D. Comun Nuovo",
  text: "Entrare nella famiglia biancoazzurra significa sostenere sport, territorio, giovani e comunità.",
  buttonLabel: "Contattaci",
  href: "/contatti",
};

export const sponsorBenefits = [
  {
    id: "visibility",
    title: "Visibilità",
    description: "Logo su maglie, banner al campo e materiali ufficiali del club.",
  },
  {
    id: "events",
    title: "Eventi",
    description: "Presenza in tornei, feste societarie e iniziative sul territorio.",
  },
  {
    id: "social",
    title: "Social Media",
    description: "Comunicazione dedicata sui canali ufficiali della società.",
  },
  {
    id: "territory",
    title: "Territorio",
    description: "Legame con Comun Nuovo e con una comunità sportiva radicata.",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Contatti con imprese, famiglie e istituzioni del territorio.",
  },
] as const;

/** Numeri del club — sezione statistiche in fondo pagina */
export const sponsorClubStats = [
  { id: "founded", value: String(foundationYear), label: "Anno di fondazione" },
  { id: "members", value: "200+", label: "Tesserati" },
  { id: "competitive", value: "Settore", label: "Agonistico" },
  { id: "grassroots", value: "Attività", label: "Di base" },
  { id: "events", value: "Eventi", label: "Sul territorio" },
] as const;
