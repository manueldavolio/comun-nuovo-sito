export type Player = {
  id: string;
  number: number | null;
  name: string;
  role: string;
};

export type MatchResult = {
  id: string;
  date: string;
  competition: string;
  opponent: string;
  isHome: boolean;
  goalsFor: number;
  goalsAgainst: number;
};

export type StandingRow = {
  position: number;
  team: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
};

export const STAFF_CATEGORIES = [
  "Dirigenza",
  "Comunicazione",
  "Prima Squadra",
  "Femminile",
  "Under 19",
  "Under 17",
  "Under 15",
  "Attività di Base",
] as const;

export type StaffCategoryName = (typeof STAFF_CATEGORIES)[number];

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  category: StaffCategoryName;
  photo: string;
  description: string;
};

export const NEWS_CATEGORIES = [
  "Prima Squadra",
  "Femminile",
  "Attività di Base",
  "Eventi",
  "Società",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsGalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  image: string;
  content: string[];
  /** In evidenza in sidebar e card hero in lista */
  featured?: boolean;
  gallery?: NewsGalleryImage[];
};

export const SPONSOR_TIERS = ["main", "gold", "partner", "technical"] as const;

export type SponsorTier = (typeof SPONSOR_TIERS)[number];

export type Sponsor = {
  id: string;
  name: string;
  tier: SponsorTier;
  description: string;
  logoUrl: string;
  website?: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** Span largo in griglia masonry (default 1) */
  span?: "normal" | "wide" | "tall";
};

export const MEDIA_GALLERY_SECTIONS = [
  "Prima Squadra",
  "Femminile",
  "Attività di Base",
  "Eventi",
  "Tifoseria",
] as const;

export type MediaGallerySectionName = (typeof MEDIA_GALLERY_SECTIONS)[number];

export type MediaGallerySection = {
  id: string;
  /** Titolo sezione/album (libero per gli album gestiti dal CMS) */
  title: string;
  images: GalleryImage[];
};

export type YoutubeVideo = {
  id: string;
  title: string;
  youtubeId: string;
  description?: string;
  /** Video principale in evidenza */
  featured?: boolean;
  /** Placeholder senza embed reale */
  comingSoon?: boolean;
};

export type MediaHighlight = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image?: string;
  date?: string;
};
