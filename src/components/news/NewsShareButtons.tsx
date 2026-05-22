"use client";

import { useCallback, useState } from "react";

type NewsShareButtonsProps = {
  title: string;
  url: string;
};

export function NewsShareButtons({ title, url }: NewsShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard non disponibile */
    }
  }, [url]);

  return (
    <section
      className="mt-12 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8"
      aria-label="Condividi articolo"
    >
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
        Condividi
      </h2>
      <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900"
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900"
        >
          {copied ? "Link copiato" : "Copia link"}
        </button>
      </div>
    </section>
  );
}
