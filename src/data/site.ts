/** Dati istituzionali e contatti — modifica qui per aggiornare footer e pagina contatti */

/** Logo ufficiale in `public/logo.png` (URL pubblico) */
export const clubLogoPath = "/logo.png";

/** Area riservata staff / gestionale (apre in nuova scheda dalla navbar) */
export const gestionaleUrl = "https://comun-nuovo-gestionale.vercel.app/";

/** Nome ufficiale senza la parola “Calcio” nel titolo societario */
export const clubName = "ASD Comun Nuovo";
export const clubShortName = "Comun Nuovo";

/** Intestazioni footer / documenti (formato esteso) */
export const clubNameFormal = "A.S.D. COMUN NUOVO";

/** Anno di fondazione — usato in homepage e comunicazione istituzionale */
export const foundationYear = 1968;

export const legal = {
  fiscalCode: "04232930166",
  vat: "04232930166",
  address: "Via Azzurri 2006, Comun Nuovo (BG)",
  /** Sede legale — testo breve per footer */
  legalSeat: "Via Azzurri 2006, Comun Nuovo",
};

export const contacts = {
  email: "info@asdcomunnuovo.it",
  /** Testo mostrato in footer e pagina contatti */
  phone: "3937087885",
  /** URI `tel:` (E.164) */
  phoneTel: "+393937087885",
  instagram: "https://www.instagram.com/a.s.d.comunnuovo",
  youtube: "https://www.youtube.com/watch?v=6mzCVcBJXNM",
};

export const claim =
  "Passione, territorio e futuro: il calcio che unisce Comun Nuovo.";

/** URL pubblico del sito — usato per condivisione social e metadata */
export const publicSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://asdcomunnuovo.it";
