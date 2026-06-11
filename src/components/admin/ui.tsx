"use client";

import { useEffect, useMemo } from "react";

/** Componenti UI condivisi del pannello admin. */

export const inputCls =
  "w-full rounded-lg border border-[#e8ecf0] bg-white px-3 py-2 text-sm text-[#001b3d] outline-none transition focus:border-[#009dff] focus:ring-2 focus:ring-[#009dff]/20 disabled:opacity-60";

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4a5568]">
        {label}
      </span>
      {children}
    </label>
  );
}

type ButtonVariant = "primary" | "ghost" | "danger";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-[#003f8f] text-white hover:bg-[#001b3d]",
  ghost: "border border-[#e8ecf0] bg-white text-[#001b3d] hover:bg-[#f3f7fb]",
  danger: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant]} ${className ?? ""}`}
    />
  );
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#001b3d]/50 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e8ecf0] px-6 py-4">
          <h2 className="text-lg font-bold text-[#001b3d]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="rounded-lg p-1.5 text-[#4a5568] transition hover:bg-[#f3f7fb] hover:text-[#001b3d]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function VisibleBadge({ visible, labels }: { visible: boolean; labels?: [string, string] }) {
  const [onLabel, offLabel] = labels ?? ["Visibile", "Nascosto"];
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        visible ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {visible ? onLabel : offLabel}
    </span>
  );
}

export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}

export function LoadingState({ label = "Caricamento…" }: { label?: string }) {
  return <p className="py-12 text-center text-sm text-[#4a5568]">{label}</p>;
}

export function EmptyState({ label }: { label: string }) {
  return (
    <p className="rounded-xl border border-dashed border-[#e8ecf0] bg-white py-12 text-center text-sm text-[#4a5568]">
      {label}
    </p>
  );
}

/** Campo immagine: anteprima dell'immagine corrente + selezione nuovo file. */
export function ImageField({
  label,
  currentUrl,
  file,
  onFileChange,
}: {
  label: string;
  currentUrl: string | null;
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : currentUrl),
    [file, currentUrl],
  );

  useEffect(() => {
    return () => {
      if (file && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);

  return (
    <Field label={label}>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e8ecf0] bg-[#f3f7fb]">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Anteprima" className="h-full w-full object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-[#4a5568]/40">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.5-3.5L9 20" />
            </svg>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-[#4a5568] file:mr-3 file:rounded-lg file:border-0 file:bg-[#003f8f] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[#001b3d]"
          />
          {file ? (
            <button
              type="button"
              onClick={() => onFileChange(null)}
              className="mt-1 text-xs font-medium text-red-600 hover:underline"
            >
              Annulla nuova immagine
            </button>
          ) : null}
        </div>
      </div>
    </Field>
  );
}
