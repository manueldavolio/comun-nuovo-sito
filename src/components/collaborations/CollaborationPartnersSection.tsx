import { CollaborationPartnerCard } from "@/components/collaborations/CollaborationPartnerCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CollaborationPartner } from "@/data/collaborations";

type Props = {
  title: string;
  subtitle: string;
  partners: CollaborationPartner[];
};

export function CollaborationPartnersSection({ title, subtitle, partners }: Props) {
  return (
    <section className="scroll-section" aria-labelledby="collaboration-partners-title">
      <article className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/[0.06] ring-1 ring-slate-900/[0.03]">
        <header className="border-b border-slate-200/80 bg-gradient-to-r from-[#001b3d] via-[#003f8f] to-[#0056b8] px-6 py-8 sm:px-10 sm:py-10">
          <div id="collaboration-partners-title">
            <SectionHeading title={title} subtitle={subtitle} light className="max-w-none" />
          </div>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-200/90">
            {partners.length} collaborazioni attive
          </p>
        </header>

        <div className="bg-gradient-to-b from-slate-50/80 via-white to-white px-4 py-8 sm:px-8 sm:py-12">
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {partners.map((partner) => (
              <li key={partner.id} className="flex">
                <CollaborationPartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
