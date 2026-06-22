export type MerchandiseProduct = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
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
    imageUrl: "/maglia.png",
    price: 49.9,
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "felpa-cappuccio-zip",
    name: "Felpa Cappuccio con Zip",
    description:
      "Felpa ufficiale biancoazzurra con cappuccio, comoda e perfetta per allenamenti, tempo libero e rappresentanza.",
    imageUrl: "/felpa.png",
    price: 54.9,
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "zaino-stadium-iii",
    name: "Zaino Stadium III",
    description:
      "Zaino sportivo nero e azzurro con logo A.S.D. Comun Nuovo, capiente e ideale per allenamenti e partite.",
    imageUrl: "/zaino.png",
    price: 34.9,
    availableSizes: ["Taglia unica"],
  },
];

export function formatMerchPrice(price: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
