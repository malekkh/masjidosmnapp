create type public.user_role as enum ('admin', 'sheikh', 'visitor');
create type public.question_status as enum ('pending', 'answered', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'visitor',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  question text not null check (char_length(question) >= 10),
  category text not null default 'عام',
  is_anonymous boolean not null default false,
  status public.question_status not null default 'pending',
  answer text,
  answered_by uuid references public.profiles(id) on delete set null,
  answered_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  speaker text,
  starts_at timestamptz not null,
  location text,
  image_url text,
  published boolean not null default false,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.announcements enable row level security;

create or replace function public.current_user_role()
returns public.user_role language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

create policy "Public profiles are readable" on public.profiles for select using (true);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Anyone can read answered questions" on public.questions for select using (status = 'answered' or user_id = auth.uid() or public.current_user_role() in ('admin', 'sheikh'));
create policy "Anyone can submit questions" on public.questions for insert with check (user_id is null or user_id = auth.uid());
create policy "Sheikhs can moderate questions" on public.questions for update using (public.current_user_role() in ('admin', 'sheikh'));
create policy "Published announcements are public" on public.announcements for select using (published = true or public.current_user_role() = 'admin');
create policy "Admins manage announcements" on public.announcements for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data ->> 'full_name'); return new; end; $$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
