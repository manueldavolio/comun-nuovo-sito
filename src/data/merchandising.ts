export type MerchandiseProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  priceLabel: string;
};

export const merchandiseHero = {
  eyebrow: "Store ufficiale",
  title: "Merchandising",
  subtitle: "Indossa i colori biancoazzurri.",
} as const;

export const merchandiseFeaturedProducts: MerchandiseProduct[] = [
  {
    id: "maglia-gara-home",
    name: "Maglia Gara Home",
    description:
      "Maglia ufficiale A.S.D. Comun Nuovo, colori biancoazzurri, ideale per partite e rappresentanza.",
    image: "/maglia.png",
    priceLabel: "Info in segreteria",
  },
  {
    id: "felpa-cappuccio-zip",
    name: "Felpa Cappuccio con Zip",
    description:
      "Felpa ufficiale biancoazzurra con cappuccio, comoda e perfetta per allenamenti, tempo libero e rappresentanza.",
    image: "/felpa.png",
    priceLabel: "Info in segreteria",
  },
  {
    id: "zaino-stadium-iii",
    name: "Zaino Stadium III",
    description:
      "Zaino sportivo nero e azzurro con logo A.S.D. Comun Nuovo, capiente e ideale per allenamenti e partite.",
    image: "/zaino.png",
    priceLabel: "Info in segreteria",
  },
];

export const merchandiseKitSection = {
  eyebrow: "Stagione sportiva",
  title: "Kit ufficiali stagione sportiva",
  description:
    "Maglie da gara, completi da allenamento e capi da rappresentanza coordinati per tutte le squadre del club. Taglie, personalizzazioni e ritiro in segreteria: contattaci per il listino aggiornato e le disponibilità.",
  buttonLabel: "Richiedi il listino kit",
  href: "/contatti",
} as const;

export const merchandiseComingSoon = {
  eyebrow: "Coming soon",
  title: "Shop online in arrivo",
  description:
    "Presto sarà possibile ordinare direttamente online i prodotti ufficiali A.S.D. Comun Nuovo.",
} as const;
