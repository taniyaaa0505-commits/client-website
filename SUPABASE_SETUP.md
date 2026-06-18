# Supabase setup

This site uses [Supabase](https://supabase.com) for the admin login and to store
contact-form inquiries. Follow these steps once to wire it up.

## 1. Create a project

1. Sign up at [supabase.com](https://supabase.com) (free tier is fine).
2. Create a new project. Pick a region close to your users and save the
   database password somewhere safe.

## 2. Create the inquiries table + security rules

Open **SQL Editor** in the Supabase dashboard, paste the following, and run it.

```sql
-- Table that backs the contact form
create table public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text,
  phone      text,
  city       text,
  message    text not null,
  type       text not null default 'Enquiry',
  status     text not null default 'New',
  created_at timestamptz not null default now()
);

-- Row Level Security: deny everything by default, then grant narrowly.
alter table public.inquiries enable row level security;

-- Anyone (anonymous visitors) may SUBMIT an inquiry, but cannot read them.
create policy "public can submit inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

-- Only logged-in admins may read, update status, or delete inquiries.
create policy "admins can read inquiries"
  on public.inquiries for select
  to authenticated using (true);

create policy "admins can update inquiries"
  on public.inquiries for update
  to authenticated using (true);

create policy "admins can delete inquiries"
  on public.inquiries for delete
  to authenticated using (true);
```

**Why this is secure:** RLS is enforced by Postgres on the server, not in the
browser. Even though the anon key ships in the JS bundle, an anonymous visitor
can only `insert` — they physically cannot read other people's inquiries or
reach the admin data.

## 3. Create the admin login

1. Go to **Authentication → Users → Add user → Create new user**.
2. Enter the admin email and a strong password. Tick **Auto Confirm User**.
3. (Recommended) Under **Authentication → Providers → Email**, turn **off**
   "Enable email signups" so no one can self-register an account.

That email + password is now the admin login used by the site's login modal.

## 4. Connect the site

1. In the dashboard: **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. In the project root, copy `.env.example` to `.env` and paste them in:

   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```

4. Restart the dev server (`npm run dev`). Vite only reads `.env` at startup.

## 5. Deploying (GitHub Pages / Vercel / Netlify)

The `.env` file is gitignored, so set the same two variables in your host's
environment-variable settings (or your CI build step). For GitHub Pages built
via GitHub Actions, add them as repository **Secrets** and expose them to the
build step as `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.

> Never commit the `service_role` key or put it in any `VITE_` variable — that
> key bypasses RLS and must stay server-side only.
