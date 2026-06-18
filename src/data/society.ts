/** Società: storia, organigramma, safeguarding — testi modificabili */

export const historyTitle = "La nostra storia";

export const historyParagraphs = [
  "A.S.D. Comun Nuovo è la principale realtà calcistica dell’omonimo comune bergamasco. Nata nel 1968, nel corso della sua storia ha partecipato stabilmente ai campionati dilettantistici regionali e provinciali, tra cui Promozione, Prima Categoria, Seconda Categoria, oltre alle esperienze nella Serie D e nella Serie C2 di calcio a 5.",
  "La società rappresenta un importante punto di aggregazione per la comunità locale. Oltre alla Prima Squadra, il club valorizza il settore agonistico, l’attività di base e le iniziative sportive rivolte a bambini, ragazzi e famiglie.",
  "Gli allenamenti e le gare casalinghe si svolgono presso il Centro Sportivo Comun Nuovo, in Via Azzurri 2006, struttura dotata di campi da calcio, spazi sportivi polifunzionali e palazzetto.",
];

export const historyInfoBox =
  "Per informazioni sempre aggiornate su rose, risultati, classifiche e calendario delle partite è possibile seguire i canali ufficiali della società.";

export type OrgRole = { name: string; role: string };

export const board: OrgRole[] = [
  { role: "Presidente", name: "Manuel D'Avolio" },
  { role: "Vicepresidente", name: "Roberto Paris" },
  { role: "Segretaria", name: "Laura Terzi" },
  { role: "Safeguarding Officer", name: "Beatrice Austoni" },
  { role: "Direttore Sportivo", name: "Pierangelo Carminati" },
  { role: "Responsabile Forniture e Merchandising", name: "Giuseppe Nobile" },
  { role: "Responsabile Under 19 e Under 17", name: "Raffaele De Falco" },
  { role: "Responsabile Settore Giovanile", name: "Samuele Guarnieri" },
  { role: "Responsabile Campi", name: "Laura Amadei" },
  { role: "Collaboratore", name: "Roberta Bonetti" },
  { role: "Collaboratore", name: "Javier Ignacio Perez" },
  { role: "Collaboratore", name: "Roberto Feruglio" },
  { role: "Social Media Manager", name: "Angela Pannullo" },
  { role: "Addetta Stampa", name: "Romina Sorbelli" },
];

export const safeguardingTitle = "Safeguarding Policy";

export const safeguardingText =
  "La società promuove un ambiente sportivo sicuro, inclusivo e rispettoso, tutelando minori, atleti, famiglie e collaboratori. La Safeguarding Policy definisce principi, comportamenti e procedure utili a prevenire ogni forma di abuso, discriminazione o condotta non adeguata.";

export const safeguardingPolicyUrl = "/safeguarding-policy.pdf";
