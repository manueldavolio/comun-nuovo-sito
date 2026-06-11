"use client";

import { useEffect, useState } from "react";
import {
  Button,
  EmptyState,
  ErrorBanner,
  Field,
  ImageField,
  inputCls,
  LoadingState,
  Modal,
  VisibleBadge,
} from "@/components/admin/ui";
import {
  adminCreateNews,
  adminDeleteNews,
  adminListNews,
  adminUpdateNews,
  slugify,
  uploadImage,
  type AdminNews,
} from "@/lib/admin";
import { NEWS_CATEGORIES } from "@/types/site";

export default function AdminNewsPage() {
  const [news, setNews] = useState<AdminNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminNews | "new" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;
    adminListNews()
      .then((rows) => {
        if (cancelled) return;
        setNews(rows);
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
  }, [refreshKey]);

  async function handleDelete(item: AdminNews) {
    if (!window.confirm(`Eliminare la news "${item.title}"?`)) return;
    try {
      await adminDeleteNews(item.id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  async function togglePublished(item: AdminNews) {
    try {
      await adminUpdateNews(item.id, {
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        content: item.content,
        coverImageUrl: item.coverImageUrl,
        category: item.category,
        published: !item.published,
        publishedAt: !item.published ? (item.publishedAt ?? new Date().toISOString()) : item.publishedAt,
      });
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'aggiornamento.");
    }
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">News</h1>
          <p className="mt-1 text-sm text-[#4a5568]">Articoli del sito: bozze e pubblicati.</p>
        </div>
        <Button onClick={() => setEditing("new")}>+ Nuova news</Button>
      </header>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : news.length === 0 ? (
        <EmptyState label="Nessuna news. Scrivi il primo articolo." />
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#e8ecf0] bg-white p-4 shadow-sm"
            >
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f3f7fb]">
                {item.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.coverImageUrl} alt={item.title} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-[#001b3d]">{item.title}</h2>
                  <VisibleBadge visible={item.published} labels={["Pubblicata", "Bozza"]} />
                </div>
                <p className="mt-0.5 text-xs text-[#4a5568]">
                  {item.category} · /news/{item.slug}
                  {item.publishedAt ? ` · ${item.publishedAt.slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="ghost" onClick={() => togglePublished(item)}>
                  {item.published ? "Riporta in bozza" : "Pubblica"}
                </Button>
                <Button variant="ghost" onClick={() => setEditing(item)}>Modifica</Button>
                <Button variant="danger" onClick={() => handleDelete(item)}>Elimina</Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing ? (
        <NewsFormModal
          item={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      ) : null}
    </div>
  );
}

function NewsFormModal({
  item,
  onClose,
  onSaved,
}: {
  item: AdminNews | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(item));
  const [subtitle, setSubtitle] = useState(item?.subtitle ?? "");
  const [category, setCategory] = useState(item?.category ?? NEWS_CATEGORIES[0]);
  const [content, setContent] = useState(item?.content ?? "");
  const [published, setPublished] = useState(item?.published ?? false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let coverImageUrl = item?.coverImageUrl ?? null;
      if (coverFile) {
        coverImageUrl = await uploadImage(coverFile, "news");
      }

      const finalSlug = slugify(slug || title);
      if (!finalSlug) {
        throw new Error("Slug non valido.");
      }

      const input = {
        slug: finalSlug,
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        content: content.trim(),
        coverImageUrl,
        category,
        published,
        publishedAt: published ? (item?.publishedAt ?? new Date().toISOString()) : (item?.publishedAt ?? null),
      };

      if (item) {
        await adminUpdateNews(item.id, input);
      } else {
        await adminCreateNews(input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
      setSaving(false);
    }
  }

  return (
    <Modal title={item ? "Modifica news" : "Nuova news"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <Field label="Titolo">
          <input required value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug (URL)">
            <input
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className={inputCls}
              placeholder="es-titolo-news"
            />
          </Field>
          <Field label="Categoria">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
              {NEWS_CATEGORIES.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Sottotitolo / anteprima (opzionale)">
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={inputCls} />
        </Field>

        <Field label="Contenuto (paragrafi separati da riga vuota)">
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className={inputCls}
          />
        </Field>

        <ImageField
          label="Immagine di copertina"
          currentUrl={item?.coverImageUrl ?? null}
          file={coverFile}
          onFileChange={setCoverFile}
        />

        <label className="flex items-center gap-2 text-sm text-[#001b3d]">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4" />
          Pubblicata (visibile sul sito)
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Annulla</Button>
          <Button type="submit" disabled={saving}>{saving ? "Salvataggio…" : "Salva"}</Button>
        </div>
      </form>
    </Modal>
  );
}
