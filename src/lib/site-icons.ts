import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";

/** Percorsi pubblici — `public/favicon.ico` ha priorità su `public/favicon.png` */
export const FAVICON_ICO_PATH = "/favicon.ico";
export const FAVICON_PNG_PATH = "/favicon.png";

const hasFaviconIco = existsSync(join(process.cwd(), "public", "favicon.ico"));

/** Icone sito (favicon + Apple touch) per metadata App Router */
export function buildSiteIcons(): NonNullable<Metadata["icons"]> {
  const icon = hasFaviconIco
    ? [
        { url: FAVICON_ICO_PATH, sizes: "any" },
        { url: FAVICON_PNG_PATH, type: "image/png" },
      ]
    : [{ url: FAVICON_PNG_PATH, type: "image/png" }];

  return {
    icon,
    shortcut: hasFaviconIco ? FAVICON_ICO_PATH : FAVICON_PNG_PATH,
    apple: [{ url: FAVICON_PNG_PATH, type: "image/png", sizes: "180x180" }],
  };
}
