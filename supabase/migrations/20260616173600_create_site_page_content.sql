create extension if not exists "pgcrypto";

create table if not exists public."SitePageContent" (
  "id" uuid primary key default gen_random_uuid(),
  "pageKey" text not null,
  "sectionKey" text not null,
  "title" text,
  "subtitle" text,
  "content" text,
  "extraJson" jsonb not null default '{}'::jsonb,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  unique ("pageKey", "sectionKey")
);

alter table public."SitePageContent" enable row level security;

drop policy if exists "public read" on public."SitePageContent";
create policy "public read"
  on public."SitePageContent"
  for select
  using (true);

drop policy if exists "authenticated write" on public."SitePageContent";
create policy "authenticated write"
  on public."SitePageContent"
  for all
  to authenticated
  using (true)
  with check (true);
