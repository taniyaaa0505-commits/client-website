# Widespread Distribution — Website

Marketing site for **Widespread Distribution** (Gurugram) — a distributor of
tissue, disposable, and housekeeping products. Single-page React app with a
cinematic hero, brand showcase, browsable brand catalogues, and a contact form
that emails the owner **and** auto-confirms to the customer.

## Tech stack

- **React 18** + **Vite 5** (fast dev server & build)
- **Tailwind CSS** for styling
- **React Router** for client-side routing (`/`, `/admin`)
- **lucide-react** icons, **Theatre.js core** for the hero accent animation
- **Web3Forms** (owner lead emails) + **EmailJS** (customer confirmation)
- Hosted on **GitHub Pages** via GitHub Actions

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values (see below)
npm run dev            # http://localhost:5173/client-website/
```

> Only run **one** dev server at a time. If port 5173 is taken, Vite silently
> moves to 5174/5175 — check the URL it prints.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server (hot reload) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |

## Environment variables

Config lives in a `.env` file (git-ignored). Copy `.env.example` → `.env` and
fill in your values:

| Variable | Purpose |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms key — emails each form submission to the owner |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service (for the customer confirmation email) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template (its "To Email" must be `{{email}}`) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

⚠️ These are `VITE_`-prefixed, so they are **bundled into the browser build and
publicly visible** on the deployed site. That's fine here — they are *public*
API keys (Web3Forms access key, EmailJS public key), not secret server
credentials. **Never** put a real secret in a `VITE_` variable. The code in
`src/data/contact.js` falls back to working defaults if `.env` is absent, so the
site still builds in CI (which has no `.env`).

## Contact form flow

1. Visitor submits the form.
2. **Owner** receives the lead via Web3Forms.
3. **Customer** receives a branded confirmation via EmailJS (best-effort — a
   failure here never blocks the submission).

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. If a deploy ever fails at the
`syncing_files` step, just re-run the job — it's usually transient. Keep large
binaries (PDFs, video) compressed to keep deploys fast and reliable.

Live site: https://taniyaaa0505-commits.github.io/client-website/

## Project structure

```
public/
  catalogues/       Brand catalogue PDFs (compressed)
  images/           Logos, brand photos, catalogue covers
  videos/hero.mp4   Hero background video
src/
  components/       UI components (Navbar, ConnectForm, CatalogueCinema, …)
  pages/            Home, AdminDashboard
  data/             products.js (brands/catalogues), contact.js (config)
  context/          InquiryContext (local admin record of submissions)
  theatre/          Hero accent animation setup
```
