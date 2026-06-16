import { ClubButton } from "@/components/ui/ClubButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  board,
  historyTitle,
  safeguardingPolicyUrl,
  safeguardingText,
  safeguardingTitle,
} from "@/data/society";
import { contentParagraphs, fetchPageContentMap, mergePageContent } from "@/lib/page-content";
import { getPageContentDefinition } from "@/lib/page-content";

export const metadata = {
  title: "Società",
};

/** Ricontrolla il database CMS ogni 5 minuti */
export const revalidate = 300;

export default async function SocietaPage() {
  const contentMap = await fetchPageContentMap("societa");
  const storiaDefinition = getPageContentDefinition("societa", "storia");
  const storia = storiaDefinition
    ? mergePageContent(storiaDefinition.fallback, contentMap.get("storia"))
    : null;
  const historyInfoBox = String(storia?.extraJson?.infoBox ?? "");
  const historyParagraphs = contentParagraphs(storia?.content);

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <SectionHeading
            eyebrow="La nostra identità"
            title={storia?.title ?? "Società"}
            subtitle={storia?.subtitle ?? "Storia, organi sociali e politiche di tutela: la base del nostro lavoro quotidiano."}
            light
          />
        </div>
      </div>

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          <section id="storia" className="scroll-section">
            <SectionHeading title={historyTitle} />
            <article className="club-card mt-8 overflow-hidden">
              <div className="border-b border-[#e8ecf0] bg-gradient-to-r from-[#f3f7fb] to-white px-6 py-4 sm:px-8 sm:py-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#003f8f]">
                  Dal 1968
                </p>
              </div>
              <div className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
                {historyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="max-w-3xl text-base leading-[1.75] text-[#4a5568] sm:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
                <aside className="mt-2 rounded-lg border border-sky-100 bg-sky-50/60 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-sm leading-relaxed text-[#334155] sm:text-[0.9375rem]">
                    {historyInfoBox}
                  </p>
                </aside>
              </div>
            </article>
          </section>

          <section id="organigramma" className="scroll-section">
            <SectionHeading
              title="Organigramma"
              subtitle="Le figure di riferimento che guidano la società sul campo e fuori."
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {board.map((member) => (
                <li
                  key={`${member.role}-${member.name}`}
                  className="club-card group relative flex flex-col overflow-hidden p-6 sm:p-7"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#003f8f] to-[#009dff] opacity-90"
                    aria-hidden
                  />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003f8f]">
                    {member.role}
                  </p>
                  <p className="mt-4 font-display text-xl uppercase leading-tight tracking-wide text-[#001b3d] sm:text-2xl">
                    {member.name}
                  </p>
                  <span
                    className="mt-5 block h-px w-10 bg-slate-200 transition-all duration-300 group-hover:w-14 group-hover:bg-[#009dff]/60"
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </section>

          <section id="safeguarding" className="scroll-section">
            <SectionHeading
              title={safeguardingTitle}
              subtitle="Impegno istituzionale per ambienti sportivi sicuri e inclusivi."
            />
            <article className="club-card mt-8 overflow-hidden">
              <div className="border-b border-[#e8ecf0] bg-gradient-to-r from-[#f3f7fb] to-white px-6 py-5 sm:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#003f8f]">
                  Tutela e inclusione
                </p>
              </div>
              <div className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
                <p className="max-w-3xl text-base leading-relaxed text-[#4a5568] sm:text-lg">
                  {safeguardingText}
                </p>
                <ClubButton href={safeguardingPolicyUrl} variant="primary" className="sm:px-6">
                  Scarica la Safeguarding Policy
                </ClubButton>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
