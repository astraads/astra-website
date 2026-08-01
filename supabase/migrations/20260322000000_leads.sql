-- ASTRA website leads — run in Supabase SQL Editor if CLI is unavailable.
create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business text not null,
  whatsapp text not null,
  service text not null,
  message text,
  source text not null default 'website',
  user_agent text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Public site can insert leads only (anon key).
drop policy if exists "Anyone can insert leads" on public.leads;
create policy "Anyone can insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 80
    and char_length(business) between 1 and 120
    and char_length(whatsapp) between 8 and 32
    and char_length(service) between 1 and 40
    and (message is null or char_length(message) <= 500)
  );

-- No public read/update/delete — view leads in the Supabase Table Editor (service role).
