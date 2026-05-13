-- DeFi Venezuela — Supabase Schema
-- Run this in the Supabase SQL editor

-- ─── Subscribers ───────────────────────────────────────────────────────────
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  notify_blog boolean default true,
  notify_herramientas boolean default true,
  notify_empleos boolean default true,
  notify_eventos boolean default true,
  notify_agentic boolean default true,
  notify_aprende boolean default true,
  created_at timestamptz default now()
);
alter table subscribers enable row level security;
create policy "Service role full access" on subscribers using (true) with check (true);

-- ─── User Profiles ─────────────────────────────────────────────────────────
create table if not exists user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  email text unique not null,
  full_name text,
  avatar_url text,
  wallets jsonb default '{}',
  interests text[] default '{}',
  newsletter_subscribed boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table user_profiles enable row level security;
create policy "Users read own profile" on user_profiles for select using (auth.uid() = user_id);
create policy "Users update own profile" on user_profiles for update using (auth.uid() = user_id);
create policy "Service role full access" on user_profiles using (true) with check (true);

-- ─── Blog Posts ────────────────────────────────────────────────────────────
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  tag text,
  excerpt text,
  content text,
  published boolean default false,
  created_at timestamptz default now()
);
alter table blog_posts enable row level security;
create policy "Public read published" on blog_posts for select using (published = true);
create policy "Service role full access" on blog_posts using (true) with check (true);

-- ─── Herramientas ──────────────────────────────────────────────────────────
create table if not exists herramientas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  description text,
  icon text default '🛠️',
  features text[],
  cta text default 'Solicitar acceso',
  href text,
  highlight boolean default false,
  published boolean default false,
  created_at timestamptz default now()
);
alter table herramientas enable row level security;
create policy "Public read published" on herramientas for select using (published = true);
create policy "Service role full access" on herramientas using (true) with check (true);

-- ─── Empleos ───────────────────────────────────────────────────────────────
create table if not exists empleos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  company_emoji text default '🏢',
  location text default 'Remote',
  salary text,
  type text default 'Full-time',
  tags text[],
  description text,
  link text,
  featured boolean default false,
  published boolean default false,
  created_at timestamptz default now()
);
alter table empleos enable row level security;
create policy "Public read published" on empleos for select using (published = true);
create policy "Service role full access" on empleos using (true) with check (true);

-- ─── Eventos ───────────────────────────────────────────────────────────────
create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  emoji text default '📅',
  date text,
  time text,
  location text,
  type text default 'Meetup',
  tags text[],
  description text,
  link text,
  featured boolean default false,
  published boolean default false,
  created_at timestamptz default now()
);
alter table eventos enable row level security;
create policy "Public read published" on eventos for select using (published = true);
create policy "Service role full access" on eventos using (true) with check (true);

-- ─── Agentic Projects ──────────────────────────────────────────────────────
create table if not exists agentic_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  difficulty text default 'Intermedio',
  icon text default '🤖',
  tools text[],
  published boolean default false,
  created_at timestamptz default now()
);
alter table agentic_projects enable row level security;
create policy "Public read published" on agentic_projects for select using (published = true);
create policy "Service role full access" on agentic_projects using (true) with check (true);

-- ─── Aprende Tracks ────────────────────────────────────────────────────────
create table if not exists aprende_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  emoji text default '📚',
  level text default 'Principiante',
  duration text,
  lessons integer default 0,
  description text,
  topics text[],
  published boolean default false,
  created_at timestamptz default now()
);
alter table aprende_tracks enable row level security;
create policy "Public read published" on aprende_tracks for select using (published = true);
create policy "Service role full access" on aprende_tracks using (true) with check (true);
