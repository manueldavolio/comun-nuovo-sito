create extension if not exists "pgcrypto";

create table if not exists "SiteMerchProduct" (
  "id" uuid primary key default gen_random_uuid(),
  "name" text not null,
  "description" text not null,
  "price" numeric(10,2) not null check ("price" >= 0),
  "imageUrl" text not null,
  "sizes" text[] not null default '{"Taglia unica"}',
  "isVisible" boolean not null default true,
  "displayOrder" integer not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "SiteMerchOrder" (
  "id" uuid primary key default gen_random_uuid(),
  "productName" text not null,
  "price" numeric(10,2) not null default 0,
  "size" text not null,
  "quantity" integer not null check ("quantity" > 0),
  "customerName" text not null,
  "phone" text not null,
  "email" text not null,
  "notes" text,
  "status" text not null default 'nuovo',
  "createdAt" timestamptz not null default now()
);

alter table "SiteMerchOrder"
  add column if not exists "price" numeric(10,2) not null default 0;

alter table "SiteMerchProduct" enable row level security;
alter table "SiteMerchOrder" enable row level security;

drop policy if exists "public read visible merch products" on "SiteMerchProduct";
create policy "public read visible merch products"
  on "SiteMerchProduct"
  for select
  using ("isVisible" = true);

drop policy if exists "authenticated write merch products" on "SiteMerchProduct";
create policy "authenticated write merch products"
  on "SiteMerchProduct"
  for all to authenticated
  using (true)
  with check (true);

drop policy if exists "public insert merch order" on "SiteMerchOrder";
create policy "public insert merch order"
  on "SiteMerchOrder"
  for insert
  with check (true);

drop policy if exists "authenticated read merch order" on "SiteMerchOrder";
create policy "authenticated read merch order"
  on "SiteMerchOrder"
  for select to authenticated
  using (true);

drop policy if exists "authenticated update merch order" on "SiteMerchOrder";
drop policy if exists "authenticated delete merch order" on "SiteMerchOrder";
