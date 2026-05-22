import Image from "next/image";
import type { CollaborationPartner } from "@/data/collaborations";

export function CollaborationPartnerCard({ partner }: { partner: CollaborationPartner }) {
  const isPlaceholder = partner.isLogoPlaceholder ?? false;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.03] transition duration-300 hover:border-sky-200/80 hover:shadow-xl hover:shadow-sky-900/[0.06]">
      <span
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#003f8f] via-[#009dff] to-[#003f8f] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-slate-200/70 bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(15,23,42,0.04)] sm:h-36 sm:px-6">
          <Image
            src={partner.logoUrl}
            alt={`Logo ${partner.name}`}
            width={280}
            height={112}
            sizes="(max-width: 640px) 220px, 280px"
            className={`max-h-[4.5rem] w-auto max-w-full object-contain sm:max-h-[5.25rem] ${
              isPlaceholder
                ? "opacity-45 grayscale"
                : "opacity-100 drop-shadow-[0_1px_1px_rgba(15,23,42,0.06)]"
            }`}
          />
        </div>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003f8f]/75">
          Partner
        </p>
        <h3 className="mt-2 font-display text-lg uppercase leading-tight tracking-wide text-slate-900 sm:text-xl">
          {partner.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
          {partner.description}
        </p>
      </div>
    </article>
  );
}
