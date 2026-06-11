-- ============================================================================
-- Setup Supabase per il pannello admin del sito ASD Comun Nuovo (/admin)
--
-- Eseguire questo script nello SQL Editor del progetto Supabase.
-- È idempotente: può essere rieseguito senza problemi.
--
-- Cosa fa:
--   1. Crea le tabelle Site* se non esistono già
--   2. Abilita la Row Level Security:
--        - lettura per tutti (anon: il sito pubblico legge con la anon key)
--        - scrittura solo per utenti autenticati (gli admin di Supabase Auth)
--   3. Crea il bucket storage "site-media" (lettura pubblica, upload solo
--      per utenti autenticati)
--
-- Gli admin si creano da Supabase Dashboard → Authentication → Users
-- ("Add user" con email + password).
-- ============================================================================

-- 1. Tabelle ----------------------------------------------------------------

create table if not exists "SiteNews" (
  "id" text primary key,
  "slug" text not null unique,
  "title" text not null,
  "subtitle" text,
  "content" text not null,
  "coverImageUrl" text,
  "category" text not null default 'Società',
  "published" boolean not null default false,
  "publishedAt" timestamptz,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SitePlayer" (
  "id" text primary key,
  "team" text not null,
  "name" text not null,
  "role" text not null,
  "shirtNumber" integer,
  "photoUrl" text,
  "isVisible" boolean not null default true,
  "sortOrder" integer not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SiteStaffMember" (
  "id" text primary key,
  "name" text not null,
  "role" text not null,
  "category" text not null,
  "description" text,
  "photoUrl" text,
  "isVisible" boolean not null default true,
  "sortOrder" integer not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SiteSponsor" (
  "id" text primary key,
  "name" text not null,
  "category" text not null default 'PARTNER',
  "logoUrl" text,
  "websiteUrl" text,
  "isVisible" boolean not null default true,
  "sortOrder" integer not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SiteGalleryAlbum" (
  "id" text primary key,
  "title" text not null,
  "date" timestamptz,
  "isVisible" boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SiteGalleryImage" (
  "id" text primary key,
  "albumId" text not null references "SiteGalleryAlbum" ("id") on delete cascade,
  "imageUrl" text not null,
  "alt" text,
  "sortOrder" integer not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SiteVideo" (
  "id" text primary key,
  "title" text not null,
  "youtubeUrl" text not null,
  "description" text,
  "isVisible" boolean not null default true,
  "sortOrder" integer not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SiteSettings" (
  "id" text primary key default 'main',
  "foundationYear" integer not null default 1973,
  "teamsCount" text not null default '10+',
  "membersCount" text not null default '250+',
  "fieldsCount" text not null default '2',
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

-- 2. Row Level Security -----------------------------------------------------

do $$
declare
  t text;
begin
  foreach t in array array[
    'SiteNews', 'SitePlayer', 'SiteStaffMember', 'SiteSponsor',
    'SiteGalleryAlbum', 'SiteGalleryImage', 'SiteVideo', 'SiteSettings'
  ]
  loop
    execute format('alter table %I enable row level security', t);

    -- Lettura pubblica (il sito usa la anon key)
    execute format('drop policy if exists "public read" on %I', t);
    execute format(
      'create policy "public read" on %I for select using (true)', t
    );

    -- Scrittura solo admin autenticati
    execute format('drop policy if exists "authenticated write" on %I', t);
    execute format(
      'create policy "authenticated write" on %I for all to authenticated using (true) with check (true)', t
    );
  end loop;
end $$;

-- 3. Storage bucket per le immagini ------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

drop policy if exists "site-media public read" on storage.objects;
create policy "site-media public read"
  on storage.objects for select
  using (bucket_id = 'site-media');

drop policy if exists "site-media authenticated insert" on storage.objects;
create policy "site-media authenticated insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media');

drop policy if exists "site-media authenticated update" on storage.objects;
create policy "site-media authenticated update"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media');

drop policy if exists "site-media authenticated delete" on storage.objects;
create policy "site-media authenticated delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media');
