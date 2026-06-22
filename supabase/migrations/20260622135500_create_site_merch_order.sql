create extension if not exists "pgcrypto";

create table if not exists "SiteMerchOrder" (
  "id" uuid primary key default gen_random_uuid(),
  "productName" text not null,
  "size" text not null,
  "quantity" integer not null check ("quantity" > 0),
  "customerName" text not null,
  "phone" text not null,
  "email" text not null,
  "notes" text,
  "status" text not null default 'nuovo',
  "createdAt" timestamptz not null default now()
);

alter table "SiteMerchOrder" enable row level security;

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
create policy "authenticated update merch order"
  on "SiteMerchOrder"
  for update to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated delete merch order" on "SiteMerchOrder";
create policy "authenticated delete merch order"
  on "SiteMerchOrder"
  for delete to authenticated
  using (true);
