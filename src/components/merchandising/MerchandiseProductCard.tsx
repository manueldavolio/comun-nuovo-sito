"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { MerchandiseProduct } from "@/data/merchandising";
import { getSupabasePublicBrowserClient } from "@/lib/supabase-public-browser";

type MerchandiseProductCardProps = {
  product: MerchandiseProduct;
  className?: string;
};

export function MerchandiseProductCard({ product, className = "" }: MerchandiseProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0] ?? "Taglia unica");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const hasClothingSizes = useMemo(
    () => product.availableSizes.some((size) => ["XS", "S", "M", "L", "XL", "XXL"].includes(size)),
    [product.availableSizes],
  );

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

        <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
          <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Taglia
            <select
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium normal-case tracking-normal text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
            >
              {product.availableSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Quantita
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium normal-case tracking-normal text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              setSuccessMessage(null);
              setIsModalOpen(true);
            }}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-sky-500 to-blue-700 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-sky-900/25 transition duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:text-sm"
          >
            Ordina ora
          </button>
          {successMessage ? <p className="text-sm font-semibold text-emerald-700">{successMessage}</p> : null}
        </div>

        {isModalOpen ? (
          <OrderModal
            product={product}
            initialSize={selectedSize}
            initialQuantity={quantity}
            hasClothingSizes={hasClothingSizes}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              setSuccessMessage("Richiesta inviata correttamente");
            }}
          />
        ) : null}
      </div>
    </article>
  );
}

type OrderModalProps = {
  product: MerchandiseProduct;
  initialSize: string;
  initialQuantity: number;
  hasClothingSizes: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

function OrderModal({
  product,
  initialSize,
  initialQuantity,
  hasClothingSizes,
  onClose,
  onSuccess,
}: OrderModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const supabase = getSupabasePublicBrowserClient();
      if (!supabase) {
        throw new Error("Modulo ordine non disponibile: Supabase non configurato.");
      }

      const { error: insertError } = await supabase.from("SiteMerchOrder").insert({
        productName: product.name,
        size,
        quantity,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        notes: notes.trim() || null,
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'invio della richiesta.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001b3d]/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">Ordine merchandising</p>
            <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.03em] text-slate-900">{product.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Chiudi modulo ordine"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <FieldLabel label="Nome e cognome">
              <input
                required
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                className={fieldClassName}
              />
            </FieldLabel>
            <FieldLabel label="Telefono">
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={fieldClassName}
              />
            </FieldLabel>
          </div>

          <FieldLabel label="Email">
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClassName}
            />
          </FieldLabel>

          <div className="grid gap-4 sm:grid-cols-3">
            <FieldLabel label="Prodotto">
              <input value={product.name} readOnly className={`${fieldClassName} bg-slate-50`} />
            </FieldLabel>
            <FieldLabel label={hasClothingSizes ? "Taglia" : "Formato"}>
              <select value={size} onChange={(event) => setSize(event.target.value)} className={fieldClassName}>
                {product.availableSizes.map((availableSize) => (
                  <option key={availableSize} value={availableSize}>
                    {availableSize}
                  </option>
                ))}
              </select>
            </FieldLabel>
            <FieldLabel label="Quantita">
              <input
                required
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                className={fieldClassName}
              />
            </FieldLabel>
          </div>

          <FieldLabel label="Note">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className={fieldClassName}
              placeholder="Preferenze su ritiro, orari o altre indicazioni"
            />
          </FieldLabel>

          <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#003f8f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#001b3d] disabled:opacity-60"
            >
              {saving ? "Invio in corso..." : "Invia richiesta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const fieldClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200";

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}
