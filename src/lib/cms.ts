import { getSupabaseClient } from "@/lib/supabase";
import {
  NEWS_CATEGORIES,
  STAFF_CATEGORIES,
  type MediaGallerySection,
  type NewsCategory,
  type NewsItem,
  type Sponsor,
  type SponsorTier,
  type StaffCategoryName,
  type StaffMember,
  type YoutubeVideo,
} from "@/types/site";
import type { PlayerRole, TeamPlayer, TechnicalStaffMember } from "@/types/team";

/**
 * Lettura contenuti CMS (gestionale → Supabase).
 * Tutte le funzioni sono fail-safe: in caso di errore o configurazione
 * mancante ritornano liste vuote / null e il sito mostra i contenuti
 * statici o i placeholder esistenti.
 */

const NEWS_FALLBACK_IMAGE = "/images/news/placeholder-1.svg";
const STAFF_FALLBACK_IMAGE = "/images/staff/placeholder-1.svg";
const SPONSOR_FALLBACK_IMAGE = "/images/sponsors/placeholder.svg";

// ---------------------------------------------------------------------------
// Tipi righe database (tabelle Site* create dal gestionale)
// ---------------------------------------------------------------------------

type SiteNewsRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  coverImageUrl: string | null;
  category: string;
  publishedAt: string | null;
  createdAt: string;
};

type SitePlayerRow = {
  id: string;
  name: string;
  role: "PORTIERE" | "DIFENSORE" | "CENTROCAMPISTA" | "ATTACCANTE";
  shirtNumber: number | null;
  photoUrl: string | null;
};

type SiteStaffRow = {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string | null;
  photoUrl: string | null;
};

type SiteSponsorRow = {
  id: string;
  name: string;
  category: "MAIN" | "GOLD" | "PARTNER" | "TECHNICAL";
  logoUrl: string | null;
  websiteUrl: string | null;
};

type SiteGalleryAlbumRow = {
  id: string;
  title: string;
  date: string | null;
  images: { id: string; imageUrl: string; alt: string | null; sortOrder: number }[];
};

type SiteVideoRow = {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string | null;
};

export type SiteSettingsData = {
  foundationYear: number;
  teamsCount: string;
  membersCount: string;
  fieldsCount: string;
};

export type SiteTeamKey =
  | "PRIMA_SQUADRA"
  | "FEMMINILE"
  | "UNDER_19"
  | "UNDER_17"
  | "UNDER_15"
  | "CALCIO_A_5_C2";

// ---------------------------------------------------------------------------
// Mapper
// ---------------------------------------------------------------------------

const PLAYER_ROLE_MAP: Record<SitePlayerRow["role"], PlayerRole> = {
  PORTIERE: "Portiere",
  DIFENSORE: "Difensore",
  CENTROCAMPISTA: "Centrocampista",
  ATTACCANTE: "Attaccante",
};

const SPONSOR_TIER_MAP: Record<SiteSponsorRow["category"], SponsorTier> = {
  MAIN: "main",
  GOLD: "gold",
  PARTNER: "partner",
  TECHNICAL: "technical",
};

function toNewsCategory(value: string): NewsCategory {
  return (NEWS_CATEGORIES as readonly string[]).includes(value)
    ? (value as NewsCategory)
    : "Società";
}

function toStaffCategory(value: string): StaffCategoryName {
  return (STAFF_CATEGORIES as readonly string[]).includes(value)
    ? (value as StaffCategoryName)
    : "Dirigenza";
}

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{6,20})/i,
    /(?:youtu\.be\/)([\w-]{6,20})/i,
    /(?:youtube\.com\/embed\/)([\w-]{6,20})/i,
    /(?:youtube\.com\/shorts\/)([\w-]{6,20})/i,
    /(?:youtube\.com\/live\/)([\w-]{6,20})/i,
  ];
  for (const pattern of patterns) {
    const match = url.trim().match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}

function mapNewsRow(row: SiteNewsRow): NewsItem {
  const date = (row.publishedAt ?? row.createdAt).slice(0, 10);
  const paragraphs = row.content
    .split(/\r?\n\s*\r?\n|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.subtitle?.trim() || paragraphs[0]?.slice(0, 200) || row.title,
    date,
    category: toNewsCategory(row.category),
    image: row.coverImageUrl || NEWS_FALLBACK_IMAGE,
    content: paragraphs,
  };
}

// ---------------------------------------------------------------------------
// Fetcher
// ---------------------------------------------------------------------------

/** News pubblicate, dalla più recente. */
export async function fetchSiteNews(): Promise<NewsItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("SiteNews")
      .select("id, slug, title, subtitle, content, coverImageUrl, category, publishedAt, createdAt")
      .eq("published", true)
      .order("publishedAt", { ascending: false });

    if (error || !data) return [];
    return (data as SiteNewsRow[]).map(mapNewsRow);
  } catch {
    return [];
  }
}

/** Singola news pubblicata per slug. */
export async function fetchSiteNewsBySlug(slug: string): Promise<NewsItem | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("SiteNews")
      .select("id, slug, title, subtitle, content, coverImageUrl, category, publishedAt, createdAt")
      .eq("published", true)
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) return null;
    return mapNewsRow(data as SiteNewsRow);
  } catch {
    return null;
  }
}

/** Rosa di una squadra gestita dal CMS (vuota se non configurata). */
export async function fetchSitePlayers(team: SiteTeamKey): Promise<TeamPlayer[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("SitePlayer")
      .select("id, name, role, shirtNumber, photoUrl")
      .eq("team", team)
      .eq("isVisible", true)
      .order("sortOrder", { ascending: true })
      .order("name", { ascending: true });

    if (error || !data) return [];
    return (data as SitePlayerRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      role: PLAYER_ROLE_MAP[row.role],
      number: row.shirtNumber,
      photo: row.photoUrl ?? undefined,
    }));
  } catch {
    return [];
  }
}

/** Staff del sito raggruppato per categoria. */
export async function fetchSiteStaff(): Promise<StaffMember[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("SiteStaffMember")
      .select("id, name, role, category, description, photoUrl")
      .eq("isVisible", true)
      .order("sortOrder", { ascending: true })
      .order("name", { ascending: true });

    if (error || !data) return [];
    return (data as SiteStaffRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      category: toStaffCategory(row.category),
      photo: row.photoUrl || STAFF_FALLBACK_IMAGE,
      description: row.description ?? "",
    }));
  } catch {
    return [];
  }
}

/**
 * Staff tecnico di una squadra dal CMS (categoria staff omonima).
 * Vuoto se il database non ha membri per quella categoria.
 */
export async function fetchSiteTeamStaff(category: StaffCategoryName): Promise<TechnicalStaffMember[]> {
  const staff = await fetchSiteStaff();
  return staff
    .filter((member) => member.category === category)
    .map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      photo: member.photo,
    }));
}

/** Sponsor visibili. */
export async function fetchSiteSponsors(): Promise<Sponsor[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("SiteSponsor")
      .select("id, name, category, logoUrl, websiteUrl")
      .eq("isVisible", true)
      .order("sortOrder", { ascending: true })
      .order("name", { ascending: true });

    if (error || !data) return [];
    return (data as SiteSponsorRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      tier: SPONSOR_TIER_MAP[row.category],
      description: "",
      logoUrl: row.logoUrl || SPONSOR_FALLBACK_IMAGE,
      website: row.websiteUrl ?? undefined,
    }));
  } catch {
    return [];
  }
}

/** Album galleria con immagini, mappati nelle sezioni della pagina Media. */
export async function fetchSiteGallerySections(): Promise<MediaGallerySection[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("SiteGalleryAlbum")
      .select("id, title, date, images:SiteGalleryImage(id, imageUrl, alt, sortOrder)")
      .eq("isVisible", true)
      .order("date", { ascending: false });

    if (error || !data) return [];

    return (data as SiteGalleryAlbumRow[])
      .filter((album) => album.images.length > 0)
      .map((album) => ({
        id: album.id,
        title: album.title,
        images: [...album.images]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((image, index) => ({
            id: image.id,
            src: image.imageUrl,
            alt: image.alt || `${album.title} — foto ${index + 1}`,
          })),
      }));
  } catch {
    return [];
  }
}

/** Video YouTube visibili (il primo è in evidenza). */
export async function fetchSiteVideos(): Promise<YoutubeVideo[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("SiteVideo")
      .select("id, title, youtubeUrl, description")
      .eq("isVisible", true)
      .order("sortOrder", { ascending: true })
      .order("createdAt", { ascending: false });

    if (error || !data) return [];

    return (data as SiteVideoRow[])
      .map((row, index): YoutubeVideo | null => {
        const youtubeId = extractYoutubeId(row.youtubeUrl);
        if (!youtubeId) return null;
        return {
          id: row.id,
          title: row.title,
          youtubeId,
          description: row.description ?? undefined,
          featured: index === 0,
        };
      })
      .filter((video): video is YoutubeVideo => video !== null);
  } catch {
    return [];
  }
}

/** Impostazioni sito (numeri homepage). */
export async function fetchSiteSettings(): Promise<SiteSettingsData | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("SiteSettings")
      .select("foundationYear, teamsCount, membersCount, fieldsCount")
      .eq("id", "main")
      .maybeSingle();

    if (error || !data) return null;
    return data as SiteSettingsData;
  } catch {
    return null;
  }
}