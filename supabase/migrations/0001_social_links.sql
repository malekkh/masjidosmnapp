create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.social_links enable row level security;

create policy "Social links are public" on public.social_links for select using (true);
create policy "Admins manage social links" on public.social_links for all
  using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

insert into public.social_links (platform, url, sort_order) values
  ('facebook', 'https://facebook.com', 1),
  ('whatsapp', 'https://wa.me/', 2),
  ('youtube', 'https://youtube.com', 3);
