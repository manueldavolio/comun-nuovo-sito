export type MerchandiseProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  priceLabel: string;
  availableSizes: string[];
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
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "felpa-cappuccio-zip",
    name: "Felpa Cappuccio con Zip",
    description:
      "Felpa ufficiale biancoazzurra con cappuccio, comoda e perfetta per allenamenti, tempo libero e rappresentanza.",
    image: "/felpa.png",
    priceLabel: "Info in segreteria",
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "zaino-stadium-iii",
    name: "Zaino Stadium III",
    description:
      "Zaino sportivo nero e azzurro con logo A.S.D. Comun Nuovo, capiente e ideale per allenamenti e partite.",
    image: "/zaino.png",
    priceLabel: "Info in segreteria",
    availableSizes: ["Taglia unica"],
  },
];
