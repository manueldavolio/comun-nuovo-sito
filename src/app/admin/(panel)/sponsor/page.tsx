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
  adminCreateSponsor,
  adminDeleteSponsor,
  adminListSponsors,
  adminUpdateSponsor,
  SPONSOR_CATEGORY_OPTIONS,
  uploadImage,
  type AdminSponsor,
  type SponsorCategoryKey,
} from "@/lib/admin";

export default function AdminSponsorPage() {
  const [sponsors, setSponsors] = useState<AdminSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminSponsor | "new" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;
    adminListSponsors()
      .then((rows) => {
        if (cancelled) return;
        setSponsors(rows);
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

  async function handleDelete(sponsor: AdminSponsor) {
    if (!window.confirm(`Eliminare lo sponsor "${sponsor.name}"?`)) return;
    try {
      await adminDeleteSponsor(sponsor.id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Sponsor</h1>
          <p className="mt-1 text-sm text-[#4a5568]">Loghi, categorie e link dei partner della società.</p>
        </div>
        <Button onClick={() => setEditing("new")}>+ Nuovo sponsor</Button>
      </header>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : sponsors.length === 0 ? (
        <EmptyState label="Nessuno sponsor. Aggiungi il primo." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e8ecf0] bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e8ecf0] bg-[#f3f7fb] text-xs uppercase tracking-wide text-[#4a5568]">
              <tr>
                <th className="px-4 py-3">Sponsor</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Sito web</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8ecf0]">
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-[#f3f7fb]/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e8ecf0] bg-white">
                        {sponsor.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                        ) : null}
                      </div>
                      <span className="font-semibold text-[#001b3d]">{sponsor.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#4a5568]">
                    {SPONSOR_CATEGORY_OPTIONS.find((c) => c.value === sponsor.category)?.label ?? sponsor.category}
                  </td>
                  <td className="px-4 py-3">
                    {sponsor.websiteUrl ? (
                      <a
                        href={sponsor.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#009dff] hover:underline"
                      >
                        {sponsor.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    ) : (
                      <span className="text-[#4a5568]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <VisibleBadge visible={sponsor.isVisible} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" onClick={() => setEditing(sponsor)}>Modifica</Button>
                      <Button variant="danger" onClick={() => handleDelete(sponsor)}>Elimina</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <SponsorFormModal
          sponsor={editing === "new" ? null : editing}
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

function SponsorFormModal({
  sponsor,
  onClose,
  onSaved,
}: {
  sponsor: AdminSponsor | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(sponsor?.name ?? "");
  const [category, setCategory] = useState<SponsorCategoryKey>(sponsor?.category ?? "PARTNER");
  const [websiteUrl, setWebsiteUrl] = useState(sponsor?.websiteUrl ?? "");
  const [sortOrder, setSortOrder] = useState(sponsor?.sortOrder?.toString() ?? "0");
  const [isVisible, setIsVisible] = useState(sponsor?.isVisible ?? true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let logoUrl = sponsor?.logoUrl ?? null;
      if (logoFile) {
        logoUrl = await uploadImage(logoFile, "sponsors");
      }

      const trimmedWebsite = websiteUrl.trim();
      const input = {
        name: name.trim(),
        category,
        logoUrl,
        websiteUrl: trimmedWebsite
          ? trimmedWebsite.startsWith("http")
            ? trimmedWebsite
            : `https://${trimmedWebsite}`
          : null,
        isVisible,
        sortOrder: Number(sortOrder) || 0,
      };

      if (sponsor) {
        await adminUpdateSponsor(sponsor.id, input);
      } else {
        await adminCreateSponsor(input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
      setSaving(false);
    }
  }

  return (
    <Modal title={sponsor ? "Modifica sponsor" : "Nuovo sponsor"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <Field label="Nome">
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Categoria">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SponsorCategoryKey)}
              className={inputCls}
            >
              {SPONSOR_CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Ordine">
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputCls} />
          </Field>
        </div>

        <Field label="Sito web (opzionale)">
          <input
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className={inputCls}
            placeholder="https://www.esempio.it"
          />
        </Field>

        <ImageField label="Logo" currentUrl={sponsor?.logoUrl ?? null} file={logoFile} onFileChange={setLogoFile} />

        <label className="flex items-center gap-2 text-sm text-[#001b3d]">
          <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="h-4 w-4" />
          Visibile sul sito
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Annulla</Button>
          <Button type="submit" disabled={saving}>{saving ? "Salvataggio…" : "Salva"}</Button>
        </div>
      </form>
    </Modal>
  );
}
