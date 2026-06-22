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
  adminCreateMerchProduct,
  adminDeleteMerchProduct,
  adminListMerchProducts,
  adminUpdateMerchProduct,
  uploadImage,
  type AdminMerchProduct,
} from "@/lib/admin";

export default function AdminMerchProductsPage() {
  const [products, setProducts] = useState<AdminMerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminMerchProduct | "new" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;
    adminListMerchProducts()
      .then((rows) => {
        if (cancelled) return;
        setProducts(rows);
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

  async function handleDelete(item: AdminMerchProduct) {
    if (!window.confirm(`Eliminare il prodotto "${item.name}"?`)) return;
    try {
      await adminDeleteMerchProduct(item.id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Prodotti merchandising</h1>
          <p className="mt-1 text-sm text-[#4a5568]">
            Gestisci i prodotti mostrati in pagina merchandising e disponibili nel modulo ordini.
          </p>
        </div>
        <Button onClick={() => setEditing("new")}>+ Nuovo prodotto</Button>
      </header>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : products.length === 0 ? (
        <EmptyState label="Nessun prodotto presente. Aggiungi il primo articolo merchandising." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#e8ecf0] bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#e8ecf0] bg-[#f3f7fb] text-xs uppercase tracking-wide text-[#4a5568]">
              <tr>
                <th className="px-4 py-3">Prodotto</th>
                <th className="px-4 py-3">Prezzo</th>
                <th className="px-4 py-3">Taglie</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3">Ordine</th>
                <th className="px-4 py-3 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8ecf0]">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-[#f3f7fb]/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f3f7fb]">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-semibold text-[#001b3d]">{item.name}</p>
                        <p className="text-xs text-[#4a5568]">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#001b3d]">{formatPrice(item.price)}</td>
                  <td className="px-4 py-3 text-[#4a5568]">{item.sizes.join(", ") || "Taglia unica"}</td>
                  <td className="px-4 py-3">
                    <VisibleBadge visible={item.isVisible} />
                  </td>
                  <td className="px-4 py-3 text-[#4a5568]">{item.displayOrder}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" onClick={() => setEditing(item)}>Modifica</Button>
                      <Button variant="danger" onClick={() => handleDelete(item)}>Elimina</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <MerchProductFormModal
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

function MerchProductFormModal({
  item,
  onClose,
  onSaved,
}: {
  item: AdminMerchProduct | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState(item?.price.toString() ?? "");
  const [sizes, setSizes] = useState((item?.sizes ?? []).join(", "));
  const [displayOrder, setDisplayOrder] = useState(item?.displayOrder.toString() ?? "0");
  const [isVisible, setIsVisible] = useState(item?.isVisible ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = item?.imageUrl ?? "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "merchandising");
      }
      if (!imageUrl.trim()) {
        throw new Error("Carica un'immagine prodotto.");
      }

      const parsedPrice = Number(price);
      if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
        throw new Error("Inserisci un prezzo valido maggiore di zero.");
      }

      const parsedSizes = parseSizes(sizes);
      const input = {
        name: name.trim(),
        description: description.trim(),
        price: parsedPrice,
        imageUrl: imageUrl.trim(),
        sizes: parsedSizes,
        isVisible,
        displayOrder: Number(displayOrder) || 0,
      };

      if (!input.name) throw new Error("Nome prodotto obbligatorio.");
      if (!input.description) throw new Error("Descrizione obbligatoria.");

      if (item) {
        await adminUpdateMerchProduct(item.id, input);
      } else {
        await adminCreateMerchProduct(input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
      setSaving(false);
    }
  }

  return (
    <Modal title={item ? "Modifica prodotto merchandising" : "Nuovo prodotto merchandising"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <Field label="Nome prodotto">
          <input required value={name} onChange={(event) => setName(event.target.value)} className={inputCls} />
        </Field>

        <Field label="Descrizione">
          <textarea
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Prezzo (€)">
            <input
              required
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Ordine visualizzazione">
            <input
              type="number"
              value={displayOrder}
              onChange={(event) => setDisplayOrder(event.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Taglie disponibili (separate da virgola)">
          <input
            value={sizes}
            onChange={(event) => setSizes(event.target.value)}
            className={inputCls}
            placeholder="XS, S, M, L, XL"
          />
        </Field>

        <ImageField label="Immagine prodotto" currentUrl={item?.imageUrl ?? null} file={imageFile} onFileChange={setImageFile} />

        <label className="flex items-center gap-2 text-sm text-[#001b3d]">
          <input type="checkbox" checked={isVisible} onChange={(event) => setIsVisible(event.target.checked)} className="h-4 w-4" />
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

function parseSizes(raw: string): string[] {
  const parsed = raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : ["Taglia unica"];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
