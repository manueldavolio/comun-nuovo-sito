import { MerchandiseHero } from "@/components/merchandising/MerchandiseHero";
import { MerchandiseProductCard } from "@/components/merchandising/MerchandiseProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { merchandiseFeaturedProducts, merchandiseHero } from "@/data/merchandising";

export const metadata = {
  title: "Merchandising",
  description:
    "Abbigliamento e accessori ufficiali A.S.D. Comun Nuovo: maglie, felpe, tute e gadget biancoazzurri.",
};

export default function MerchandisingPage() {
  return (
    <div>
      <MerchandiseHero
        eyebrow={merchandiseHero.eyebrow}
        title={merchandiseHero.title}
        subtitle={merchandiseHero.subtitle}
      />

      <section className="relative border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(125deg, transparent, transparent 18px, rgba(14,165,233,0.04) 18px, rgba(14,165,233,0.04) 19px)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ordine diretto"
            title="Prodotti ufficiali"
            subtitle="Seleziona prodotto, taglia e quantita: al click su Ordina ora compili il modulo e la richiesta arriva direttamente alla societa."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {merchandiseFeaturedProducts.map((product) => (
              <MerchandiseProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-600">
            Pagamento online non attivo: pagamento e ritiro vengono gestiti direttamente dalla societa.
          </p>
        </div>
      </section>
    </div>
  );
}
