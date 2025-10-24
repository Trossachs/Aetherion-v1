-- supabase_schema.sql
create extension if not exists pgcrypto;

create table if not exists aetherion_core (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value jsonb not null,
  created_at timestamptz default now(),
  locked boolean default true
);

create table if not exists memory_logs (
  id uuid default gen_random_uuid() primary key,
  user_name text,
  message text,
  response text,
  created_at timestamptz default now()
);
