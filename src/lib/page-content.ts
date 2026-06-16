import { baseActivityCategories, type BaseActivityCategory } from "@/data/base-activities";
import { sponsorsEmptyState, sponsorHero } from "@/data/sponsors";
import { staffCategorySections, staffHero } from "@/data/staff";
import { historyInfoBox, historyParagraphs } from "@/data/society";
import { getSupabaseClient } from "@/lib/supabase";
import type { StaffCategoryName } from "@/types/site";

export type SitePageContentRow = {
  id: string;
  pageKey: string;
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  extraJson: Record<string, unknown> | null;
  updatedAt: string | null;
};

export type PageContentInput = Omit<SitePageContentRow, "id" | "updatedAt">;

export type EditableField =
  | { key: "title" | "subtitle" | "content"; label: string; type?: "input" | "textarea"; rows?: number }
  | { key: string; label: string; type?: "input" | "textarea"; rows?: number; extra: true };

export type PageContentSectionDefinition = {
  pageKey: string;
  sectionKey: string;
  label: string;
  description?: string;
  fallback: PageContentInput;
  fields: EditableField[];
};

export type PageContentGroupDefinition = {
  pageKey: string;
  label: string;
  description: string;
  sections: PageContentSectionDefinition[];
};

const categoryStaffText = "Il team tecnico di riferimento (in aggiornamento).";

function joinParagraphs(paragraphs: string[]) {
  return paragraphs.join("\n\n");
}

function categoryFallback(category: BaseActivityCategory): PageContentInput {
  return {
    pageKey: "attivita-di-base",
    sectionKey: category.slug,
    title: category.title,
    subtitle: category.heroSubtitle,
    content: joinParagraphs(category.description),
    extraJson: {
      ageHint: category.ageHint,
      staffText: categoryStaffText,
      ctaText: `Per iscrizioni, orari aggiornati e informazioni sulla categoria ${category.title}, contattaci.`,
    },
  };
}

export const PAGE_CONTENT_GROUPS: PageContentGroupDefinition[] = [
  {
    pageKey: "societa",
    label: "Società / Storia",
    description: "Hero della pagina Società e contenuti della sezione Storia.",
    sections: [
      {
        pageKey: "societa",
        sectionKey: "storia",
        label: "Società / Storia",
        fallback: {
          pageKey: "societa",
          sectionKey: "storia",
          title: "Società",
          subtitle: "Storia, organi sociali e politiche di tutela: la base del nostro lavoro quotidiano.",
          content: joinParagraphs(historyParagraphs),
          extraJson: {
            infoBox: historyInfoBox,
          },
        },
        fields: [
          { key: "title", label: "Titolo pagina" },
          { key: "subtitle", label: "Sottotitolo", type: "textarea", rows: 3 },
          { key: "content", label: "Testo storia", type: "textarea", rows: 9 },
          { key: "infoBox", label: "Box informativo finale", type: "textarea", rows: 4, extra: true },
        ],
      },
    ],
  },
  {
    pageKey: "attivita-di-base",
    label: "Attività di Base / categorie",
    description: "Testi delle pagine Scuola Calcio, Primi Calci, Pulcini ed Esordienti.",
    sections: baseActivityCategories.map((category) => ({
      pageKey: "attivita-di-base",
      sectionKey: category.slug,
      label: category.title,
      fallback: categoryFallback(category),
      fields: [
        { key: "title", label: "Titolo" },
        { key: "subtitle", label: "Sottotitolo hero", type: "textarea", rows: 3 },
        { key: "ageHint", label: "Fascia età indicativa", extra: true },
        { key: "content", label: "Descrizione principale", type: "textarea", rows: 7 },
        { key: "staffText", label: "Testo staff categoria", type: "textarea", rows: 3, extra: true },
        { key: "ctaText", label: "CTA finale", type: "textarea", rows: 3, extra: true },
      ],
    })),
  },
  {
    pageKey: "staff",
    label: "Staff",
    description: "Hero e testi introduttivi delle sezioni staff.",
    sections: [
      {
        pageKey: "staff",
        sectionKey: "hero",
        label: "Hero",
        fallback: {
          pageKey: "staff",
          sectionKey: "hero",
          title: staffHero.title,
          subtitle: staffHero.subtitle,
          content: "",
          extraJson: {},
        },
        fields: [
          { key: "title", label: "Titolo hero" },
          { key: "subtitle", label: "Sottotitolo hero", type: "textarea", rows: 3 },
        ],
      },
      ...staffCategorySections
        .filter(({ category }) => category !== "Comunicazione")
        .map(({ category, subtitle }) => ({
          pageKey: "staff",
          sectionKey: staffSectionKey(category),
          label: category,
          fallback: {
            pageKey: "staff",
            sectionKey: staffSectionKey(category),
            title: category,
            subtitle: subtitle ?? "",
            content: "",
            extraJson: {},
          },
          fields: [{ key: "subtitle" as const, label: `Descrizione sezione ${category}`, type: "textarea" as const, rows: 3 }],
        })),
    ],
  },
  {
    pageKey: "sponsor",
    label: "Sponsor",
    description: "Hero Sponsor e messaggio quando l'elenco è in aggiornamento.",
    sections: [
      {
        pageKey: "sponsor",
        sectionKey: "main",
        label: "Sponsor",
        fallback: {
          pageKey: "sponsor",
          sectionKey: "main",
          title: sponsorHero.title,
          subtitle: sponsorHero.subtitle,
          content: sponsorsEmptyState.message,
          extraJson: {},
        },
        fields: [
          { key: "title", label: "Titolo pagina" },
          { key: "subtitle", label: "Sottotitolo", type: "textarea", rows: 3 },
          { key: "content", label: "Testo in aggiornamento", type: "textarea", rows: 3 },
        ],
      },
    ],
  },
  {
    pageKey: "news",
    label: "News",
    description: "Hero News e messaggio quando non ci sono articoli.",
    sections: [
      {
        pageKey: "news",
        sectionKey: "main",
        label: "News",
        fallback: {
          pageKey: "news",
          sectionKey: "main",
          title: "Ultime News",
          subtitle: "Tutte le novità dal mondo biancoazzurro.",
          content: "Le news ufficiali verranno pubblicate a breve.",
          extraJson: {},
        },
        fields: [
          { key: "title", label: "Titolo pagina" },
          { key: "subtitle", label: "Sottotitolo", type: "textarea", rows: 3 },
          { key: "content", label: "Testo quando non ci sono news", type: "textarea", rows: 3 },
        ],
      },
    ],
  },
  {
    pageKey: "media",
    label: "Media",
    description: "Hero Media e messaggio quando non ci sono contenuti media.",
    sections: [
      {
        pageKey: "media",
        sectionKey: "main",
        label: "Media",
        fallback: {
          pageKey: "media",
          sectionKey: "main",
          title: "Media",
          subtitle: "Vivi il mondo biancoazzurro dentro e fuori dal campo.",
          content: "Foto e video ufficiali verranno pubblicati a breve.",
          extraJson: {},
        },
        fields: [
          { key: "title", label: "Titolo pagina" },
          { key: "subtitle", label: "Sottotitolo", type: "textarea", rows: 3 },
          { key: "content", label: "Testo quando non ci sono media", type: "textarea", rows: 3 },
        ],
      },
    ],
  },
];

export function staffSectionKey(category: StaffCategoryName): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const PAGE_CONTENT_SECTIONS = PAGE_CONTENT_GROUPS.flatMap((group) => group.sections);

export function getPageContentDefinition(pageKey: string, sectionKey: string) {
  return PAGE_CONTENT_SECTIONS.find(
    (section) => section.pageKey === pageKey && section.sectionKey === sectionKey,
  );
}

export function mergePageContent(
  fallback: PageContentInput,
  row?: SitePageContentRow | null,
): PageContentInput {
  if (!row) return fallback;

  return {
    pageKey: fallback.pageKey,
    sectionKey: fallback.sectionKey,
    title: row.title?.trim() || fallback.title,
    subtitle: row.subtitle?.trim() || fallback.subtitle,
    content: row.content?.trim() || fallback.content,
    extraJson: {
      ...(fallback.extraJson ?? {}),
      ...(row.extraJson ?? {}),
    },
  };
}

export function contentParagraphs(value: string | null | undefined): string[] {
  return (value ?? "")
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function fetchPageContentRows(pageKey: string): Promise<SitePageContentRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("SitePageContent")
      .select("id, pageKey, sectionKey, title, subtitle, content, extraJson, updatedAt")
      .eq("pageKey", pageKey);

    if (error || !data) return [];
    return data as SitePageContentRow[];
  } catch {
    return [];
  }
}

export async function fetchPageContentMap(pageKey: string): Promise<Map<string, SitePageContentRow>> {
  const rows = await fetchPageContentRows(pageKey);
  return new Map(rows.map((row) => [row.sectionKey, row]));
}
