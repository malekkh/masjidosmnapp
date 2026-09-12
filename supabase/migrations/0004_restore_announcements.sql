create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  speaker text,
  starts_at timestamptz not null,
  location text,
  published boolean not null default false,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

drop policy if exists "Published announcements are public" on public.announcements;
drop policy if exists "Admins manage announcements" on public.announcements;
drop policy if exists "Admins insert announcements" on public.announcements;
drop policy if exists "Admins update announcements" on public.announcements;
drop policy if exists "Admins delete announcements" on public.announcements;

create policy "Published current announcements are public"
  on public.announcements for select
  using (published = true and starts_at >= now() - interval '7 days' and starts_at <= now() + interval '7 days');

create policy "Admins read all announcements"
  on public.announcements for select
  using (public.current_user_role() = 'admin');

create policy "Admins insert announcements"
  on public.announcements for insert
  with check (public.current_user_role() = 'admin' and created_by = auth.uid());

create policy "Admins update announcements"
  on public.announcements for update
  using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

create policy "Admins delete announcements"
  on public.announcements for delete
  using (public.current_user_role() = 'admin');

create index if not exists announcements_current_idx
  on public.announcements (published, starts_at desc);