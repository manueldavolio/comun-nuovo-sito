"use client";

import { useState } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200";

const labelClass = "block text-sm font-medium text-slate-800";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/[0.06] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Nome
          <input
            required
            name="firstName"
            autoComplete="given-name"
            className={inputClass}
            placeholder="Il tuo nome"
          />
        </label>
        <label className={labelClass}>
          Cognome
          <input
            required
            name="lastName"
            autoComplete="family-name"
            className={inputClass}
            placeholder="Il tuo cognome"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={inputClass}
            placeholder="nome@email.it"
          />
        </label>
        <label className={labelClass}>
          Telefono
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className={inputClass}
            placeholder="333 1234567"
          />
        </label>
      </div>

      <label className={`mt-4 ${labelClass}`}>
        Messaggio
        <textarea
          required
          name="message"
          rows={5}
          className={inputClass}
          placeholder="Scrivi qui la tua richiesta..."
        />
      </label>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-blue-700 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-sky-900/20 transition hover:brightness-110 sm:w-auto sm:min-w-[200px] sm:px-10"
        >
          Invia richiesta
        </button>
      </div>

      {status === "sent" ? (
        <p className="mt-4 text-sm text-slate-600" role="status">
          Richiesta inviata (demo frontend). Collega un servizio email o API per l&apos;invio in
          produzione.
        </p>
      ) : null}
    </form>
  );
}
