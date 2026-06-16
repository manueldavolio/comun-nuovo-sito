import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { PageContentInput, SitePageContentRow } from "@/lib/page-content";
import type { SiteTeamKey } from "@/lib/cms";

/**
 * Operazioni di scrittura per il pannello admin (/admin).
 * Lavora sulle stesse tabelle `Site*` lette da `src/lib/cms.ts`,
 * usando il client browser autenticato (Supabase Auth + RLS).
 */

// ---------------------------------------------------------------------------
// Tipi righe (versione admin: include anche bozze / elementi nascosti)
// ---------------------------------------------------------------------------

export type PlayerRoleKey = "PORTIERE" | "DIFENSORE" | "CENTROCAMPISTA" | "ATTACCANTE";
export type SponsorCategoryKey = "MAIN" | "GOLD" | "PARTNER" | "TECHNICAL";

export type AdminPlayer = {
  id: string;
  team: SiteTeamKey;
  name: string;
  role: PlayerRoleKey;
  shirtNumber: number | null;
  photoUrl: string | null;
  isVisible: boolean;
  sortOrder: number;
};

export type AdminStaffMember = {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string | null;
  photoUrl: string | null;
  isVisible: boolean;
  sortOrder: number;
};

export type AdminNews = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  coverImageUrl: string | null;
  category: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export type AdminSponsor = {
  id: string;
  name: string;
  category: SponsorCategoryKey;
  logoUrl: string | null;
  websiteUrl: string | null;
  isVisible: boolean;
  sortOrder: number;
};

export type AdminGalleryImage = {
  id: string;
  albumId: string;
  imageUrl: string;
  alt: string | null;
  sortOrder: number;
};

export type AdminGalleryAlbum = {
  id: string;
  title: string;
  date: string | null;
  isVisible: boolean;
  images: AdminGalleryImage[];
};

export type AdminVideo = {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string | null;
  isVisible: boolean;
  sortOrder: number;
};

// ---------------------------------------------------------------------------
// Opzioni per i form
// ---------------------------------------------------------------------------

export const TEAM_OPTIONS: { value: SiteTeamKey; label: string }[] = [
  { value: "PRIMA_SQUADRA", label: "Prima Squadra" },
  { value: "FEMMINILE", label: "Femminile" },
  { value: "UNDER_19", label: "Under 19" },
  { value: "UNDER_17", label: "Under 17" },
  { value: "UNDER_15", label: "Under 15" },
  { value: "CALCIO_A_5_C2", label: "Calcio a 5 C2" },
];

export const PLAYER_ROLE_OPTIONS: { value: PlayerRoleKey; label: string }[] = [
  { value: "PORTIERE", label: "Portiere" },
  { value: "DIFENSORE", label: "Difensore" },
  { value: "CENTROCAMPISTA", label: "Centrocampista" },
  { value: "ATTACCANTE", label: "Attaccante" },
];

export const SPONSOR_CATEGORY_OPTIONS: { value: SponsorCategoryKey; label: string }[] = [
  { value: "MAIN", label: "Main Sponsor" },
  { value: "GOLD", label: "Gold Sponsor" },
  { value: "PARTNER", label: "Partner" },
  { value: "TECHNICAL", label: "Sponsor Tecnico" },
];

// ---------------------------------------------------------------------------
// Helper interni
// ---------------------------------------------------------------------------

function requireClient() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase non configurato: controlla le variabili d'ambiente.");
  }
  return supabase;
}

function nowIso() {
  return new Date().toISOString();
}

async function insertRow(table: string, values: Record<string, unknown>) {
  const supabase = requireClient();
  const { error } = await supabase.from(table).insert({
    id: crypto.randomUUID(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    ...values,
  });
  if (error) throw new Error(error.message);
}

async function updateRow(table: string, id: string, values: Record<string, unknown>) {
  const supabase = requireClient();
  const { error } = await supabase
    .from(table)
    .update({ updatedAt: nowIso(), ...values })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

async function deleteRow(table: string, id: string) {
  const supabase = requireClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function countRows(table: string): Promise<number> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return 0;
  const { count, error } = await supabase.from(table).select("id", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}

// ---------------------------------------------------------------------------
// Contenuti testuali pagine
// ---------------------------------------------------------------------------

export async function adminListPageContents(): Promise<SitePageContentRow[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("SitePageContent")
    .select("id, pageKey, sectionKey, title, subtitle, content, extraJson, createdAt, updatedAt")
    .order("pageKey", { ascending: true })
    .order("sectionKey", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as SitePageContentRow[];
}

export async function adminUpsertPageContent(input: PageContentInput) {
  const supabase = requireClient();
  const timestamp = nowIso();
  const values = {
    pageKey: input.pageKey,
    sectionKey: input.sectionKey,
    title: input.title,
    subtitle: input.subtitle,
    content: input.content,
    extraJson: input.extraJson,
    updatedAt: timestamp,
  };
  const { data: existing, error: lookupError } = await supabase
    .from("SitePageContent")
    .select("id")
    .eq("pageKey", input.pageKey)
    .eq("sectionKey", input.sectionKey)
    .maybeSingle();

  if (lookupError) throw new Error(lookupError.message);

  const { error } = existing
    ? await supabase.from("SitePageContent").update(values).eq("id", existing.id)
    : await supabase.from("SitePageContent").insert({
        createdAt: timestamp,
        ...values,
      });

  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Upload immagini (Supabase Storage)
// ---------------------------------------------------------------------------

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "site-media";

export async function uploadImage(file: File, folder: string): Promise<string> {
  const supabase = requireClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(`Upload fallito: ${error.message}`);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ---------------------------------------------------------------------------
// Giocatori
// ---------------------------------------------------------------------------

export async function adminListPlayers(team: SiteTeamKey): Promise<AdminPlayer[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("SitePlayer")
    .select("id, team, name, role, shirtNumber, photoUrl, isVisible, sortOrder")
    .eq("team", team)
    .order("sortOrder", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminPlayer[];
}

export type PlayerInput = Omit<AdminPlayer, "id">;

export async function adminCreatePlayer(input: PlayerInput) {
  await insertRow("SitePlayer", input);
}

export async function adminUpdatePlayer(id: string, input: PlayerInput) {
  await updateRow("SitePlayer", id, input);
}

export async function adminDeletePlayer(id: string) {
  await deleteRow("SitePlayer", id);
}

// ---------------------------------------------------------------------------
// Staff
// ---------------------------------------------------------------------------

export async function adminListStaff(): Promise<AdminStaffMember[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("SiteStaffMember")
    .select("id, name, role, category, description, photoUrl, isVisible, sortOrder")
    .order("category", { ascending: true })
    .order("sortOrder", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminStaffMember[];
}

export type StaffInput = Omit<AdminStaffMember, "id">;

export async function adminCreateStaff(input: StaffInput) {
  await insertRow("SiteStaffMember", input);
}

export async function adminUpdateStaff(id: string, input: StaffInput) {
  await updateRow("SiteStaffMember", id, input);
}

export async function adminDeleteStaff(id: string) {
  await deleteRow("SiteStaffMember", id);
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export async function adminListNews(): Promise<AdminNews[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("SiteNews")
    .select("id, slug, title, subtitle, content, coverImageUrl, category, published, publishedAt, createdAt")
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminNews[];
}

export type NewsInput = Omit<AdminNews, "id" | "createdAt">;

export async function adminCreateNews(input: NewsInput) {
  await insertRow("SiteNews", input);
}

export async function adminUpdateNews(id: string, input: NewsInput) {
  await updateRow("SiteNews", id, input);
}

export async function adminDeleteNews(id: string) {
  await deleteRow("SiteNews", id);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---------------------------------------------------------------------------
// Sponsor
// ---------------------------------------------------------------------------

export async function adminListSponsors(): Promise<AdminSponsor[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("SiteSponsor")
    .select("id, name, category, logoUrl, websiteUrl, isVisible, sortOrder")
    .order("category", { ascending: true })
    .order("sortOrder", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminSponsor[];
}

export type SponsorInput = Omit<AdminSponsor, "id">;

export async function adminCreateSponsor(input: SponsorInput) {
  await insertRow("SiteSponsor", input);
}

export async function adminUpdateSponsor(id: string, input: SponsorInput) {
  await updateRow("SiteSponsor", id, input);
}

export async function adminDeleteSponsor(id: string) {
  await deleteRow("SiteSponsor", id);
}

// ---------------------------------------------------------------------------
// Media: album foto
// ---------------------------------------------------------------------------

export async function adminListAlbums(): Promise<AdminGalleryAlbum[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("SiteGalleryAlbum")
    .select("id, title, date, isVisible, images:SiteGalleryImage(id, albumId, imageUrl, alt, sortOrder)")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return ((data ?? []) as AdminGalleryAlbum[]).map((album) => ({
    ...album,
    images: [...album.images].sort((a, b) => a.sortOrder - b.sortOrder),
  }));
}

export type AlbumInput = { title: string; date: string | null; isVisible: boolean };

export async function adminCreateAlbum(input: AlbumInput) {
  await insertRow("SiteGalleryAlbum", input);
}

export async function adminUpdateAlbum(id: string, input: AlbumInput) {
  await updateRow("SiteGalleryAlbum", id, input);
}

/** Elimina album e relative immagini. */
export async function adminDeleteAlbum(id: string) {
  const supabase = requireClient();
  const { error: imagesError } = await supabase.from("SiteGalleryImage").delete().eq("albumId", id);
  if (imagesError) throw new Error(imagesError.message);
  await deleteRow("SiteGalleryAlbum", id);
}

export async function adminAddAlbumImage(albumId: string, imageUrl: string, alt: string, sortOrder: number) {
  await insertRow("SiteGalleryImage", { albumId, imageUrl, alt: alt || null, sortOrder });
}

export async function adminDeleteAlbumImage(id: string) {
  await deleteRow("SiteGalleryImage", id);
}

// ---------------------------------------------------------------------------
// Media: video YouTube
// ---------------------------------------------------------------------------

export async function adminListVideos(): Promise<AdminVideo[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("SiteVideo")
    .select("id, title, youtubeUrl, description, isVisible, sortOrder")
    .order("sortOrder", { ascending: true })
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminVideo[];
}

export type VideoInput = Omit<AdminVideo, "id">;

export async function adminCreateVideo(input: VideoInput) {
  await insertRow("SiteVideo", input);
}

export async function adminUpdateVideo(id: string, input: VideoInput) {
  await updateRow("SiteVideo", id, input);
}

export async function adminDeleteVideo(id: string) {
  await deleteRow("SiteVideo", id);
}
