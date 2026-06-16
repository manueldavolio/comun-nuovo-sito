"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  ErrorBanner,
  Field,
  inputCls,
  LoadingState,
} from "@/components/admin/ui";
import { adminListPageContents, adminUpsertPageContent } from "@/lib/admin";
import {
  getPageContentDefinition,
  mergePageContent,
  PAGE_CONTENT_GROUPS,
  type EditableField,
  type PageContentInput,
  type PageContentSectionDefinition,
  type SitePageContentRow,
} from "@/lib/page-content";

type SelectedSection = {
  pageKey: string;
  sectionKey: string;
};

function sectionId(section: SelectedSection) {
  return `${section.pageKey}:${section.sectionKey}`;
}

function getFieldValue(content: PageContentInput, field: EditableField): string {
  if (field.key === "title" || field.key === "subtitle" || field.key === "content") {
    return content[field.key] ?? "";
  }

  return String(content.extraJson?.[field.key] ?? "");
}

function setFieldValue(content: PageContentInput, field: EditableField, value: string): PageContentInput {
  if (field.key === "title" || field.key === "subtitle" || field.key === "content") {
    return { ...content, [field.key]: value };
  }

  return {
    ...content,
    extraJson: {
      ...(content.extraJson ?? {}),
      [field.key]: value,
    },
  };
}

export default function AdminPaginePage() {
  const firstSection = PAGE_CONTENT_GROUPS[0].sections[0];
  const [selected, setSelected] = useState<SelectedSection>({
    pageKey: firstSection.pageKey,
    sectionKey: firstSection.sectionKey,
  });
  const [rows, setRows] = useState<SitePageContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rowMap = useMemo(
    () => new Map(rows.map((row) => [sectionId(row), row])),
    [rows],
  );

  const definition = getPageContentDefinition(selected.pageKey, selected.sectionKey);
  const [draft, setDraft] = useState<PageContentInput>(() =>
    mergePageContent(firstSection.fallback, null),
  );

  useEffect(() => {
    let cancelled = false;
    adminListPageContents()
      .then((items) => {
        if (cancelled) return;
        setRows(items);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Errore di caricamento.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!definition) return;
    setDraft(mergePageContent(definition.fallback, rowMap.get(sectionId(definition))));
    setSavedAt(null);
  }, [definition, rowMap]);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!definition) return;

    setSaving(true);
    setError(null);
    setSavedAt(null);

    try {
      await adminUpsertPageContent(draft);
      const nextRows = await adminListPageContents();
      setRows(nextRows);
      setSavedAt(new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState />;
  if (!definition) return <ErrorBanner message="Sezione non trovata." />;

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Pagine</h1>
        <p className="mt-1 text-sm text-[#4a5568]">
          Modifica i testi delle pagine pubbliche. Se un campo resta vuoto, il sito usa il testo statico esistente.
        </p>
      </header>

      <ErrorBanner message={error} />

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          {PAGE_CONTENT_GROUPS.map((group) => (
            <section key={group.pageKey} className="rounded-2xl border border-[#e8ecf0] bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#001b3d]">{group.label}</h2>
              <p className="mt-1 text-xs leading-relaxed text-[#4a5568]">{group.description}</p>
              <div className="mt-3 space-y-1.5">
                {group.sections.map((section) => (
                  <SectionButton
                    key={sectionId(section)}
                    section={section}
                    active={sectionId(section) === sectionId(selected)}
                    saved={rowMap.has(sectionId(section))}
                    onClick={() => setSelected({ pageKey: section.pageKey, sectionKey: section.sectionKey })}
                  />
                ))}
              </div>
            </section>
          ))}
        </aside>

        <form onSubmit={handleSave} className="rounded-2xl border border-[#e8ecf0] bg-white p-5 shadow-sm">
          <div className="mb-5 border-b border-[#e8ecf0] pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#009dff]">
              {definition.pageKey} / {definition.sectionKey}
            </p>
            <h2 className="mt-1 font-display text-3xl tracking-wide text-[#001b3d]">{definition.label}</h2>
            {definition.description ? (
              <p className="mt-1 text-sm text-[#4a5568]">{definition.description}</p>
            ) : null}
          </div>

          <div className="space-y-4">
            {definition.fields.map((field) => (
              <Field key={field.key} label={field.label}>
                {field.type === "textarea" ? (
                  <textarea
                    value={getFieldValue(draft, field)}
                    onChange={(event) => setDraft((current) => setFieldValue(current, field, event.target.value))}
                    rows={field.rows ?? 4}
                    className={inputCls}
                  />
                ) : (
                  <input
                    value={getFieldValue(draft, field)}
                    onChange={(event) => setDraft((current) => setFieldValue(current, field, event.target.value))}
                    className={inputCls}
                  />
                )}
              </Field>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8ecf0] pt-4">
            <p className="text-xs text-[#4a5568]">
              {savedAt ? `Salvato alle ${savedAt}.` : rowMap.has(sectionId(definition)) ? "Contenuto già salvato nel database." : "Questa sezione usa ancora i testi statici."}
            </p>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvataggio…" : "Salva testi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionButton({
  section,
  active,
  saved,
  onClick,
}: {
  section: PageContentSectionDefinition;
  active: boolean;
  saved: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
        active ? "bg-[#003f8f] text-white" : "text-[#001b3d] hover:bg-[#f3f7fb]"
      }`}
    >
      <span className="font-semibold">{section.label}</span>
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${active ? "bg-white/15" : "bg-[#f3f7fb] text-[#4a5568]"}`}>
        {saved ? "DB" : "Fallback"}
      </span>
    </button>
  );
}
