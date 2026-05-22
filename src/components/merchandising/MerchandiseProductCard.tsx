import Image from "next/image";
import Link from "next/link";
import type { MerchandiseProduct } from "@/data/merchandising";

type MerchandiseProductCardProps = {
  product: MerchandiseProduct;
  className?: string;
};

export function MerchandiseProductCard({ product, className = "" }: MerchandiseProductCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_22px_50px_-32px_rgba(15,23,42,0.35)] transition duration-300 ease-out hover:-translate-y-1 hover:border-sky-300/70 hover:shadow-[0_32px_64px_-28px_rgba(56,189,248,0.22)] ${className}`}
    >
      <div className="relative bg-white">
        <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-white px-5 py-6 sm:px-7 sm:py-8">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 sm:p-4"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg uppercase tracking-[0.04em] text-slate-900 sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{product.description}</p>
        <p className="mt-4 text-sm font-semibold text-[#003f8f]">{product.priceLabel}</p>
        <Link
          href="/contatti"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-sky-500 to-blue-700 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-sky-900/25 transition duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:text-sm"
        >
          Richiedi informazioni
        </Link>
      </div>
    </article>
  );
}
