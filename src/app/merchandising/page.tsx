import { MerchandiseComingSoon } from "@/components/merchandising/MerchandiseComingSoon";
import { MerchandiseHero } from "@/components/merchandising/MerchandiseHero";
import { MerchandiseKitSection } from "@/components/merchandising/MerchandiseKitSection";
import { MerchandiseProductCard } from "@/components/merchandising/MerchandiseProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  merchandiseComingSoon,
  merchandiseFeaturedProducts,
  merchandiseHero,
  merchandiseKitSection,
} from "@/data/merchandising";

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
            eyebrow="Collezione ufficiale"
            title="In evidenza"
            subtitle="I prodotti ufficiali A.S.D. Comun Nuovo: maglia, felpa e zaino per partite, allenamenti e rappresentanza."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {merchandiseFeaturedProducts.map((product) => (
              <MerchandiseProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[var(--club-page)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <MerchandiseKitSection
            eyebrow={merchandiseKitSection.eyebrow}
            title={merchandiseKitSection.title}
            description={merchandiseKitSection.description}
            buttonLabel={merchandiseKitSection.buttonLabel}
            href={merchandiseKitSection.href}
          />
        </div>
      </div>

      <MerchandiseComingSoon
        eyebrow={merchandiseComingSoon.eyebrow}
        title={merchandiseComingSoon.title}
        description={merchandiseComingSoon.description}
      />
    </div>
  );
}
