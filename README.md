# APIARY

**Resala STEM Sub Branches — Season 7**

A beautiful, fast, complete, static, developer-controlled organizational website.

Hosted on **GitHub Pages** only. No other hosting.

---

## Architecture

    Developer
        ↓
    Data Files          (src/data/*.ts)
        ↓
    Automatic Calculus  (src/lib/derive.ts)
        ↓
    Reusable Components (src/components/**)
        ↓
    Static Pages        (src/pages/**)
        ↓
    GitHub Pages        (dist/ via Actions)
        ↓
    Users / Visitors

## Adding data (the only thing you normally do)

| What | Where |
| --- | --- |
| New member | `src/data/members.ts` |
| New contribution | `src/data/contributions.ts` |
| New achievement | `src/data/achievements.ts` |
| New certificate | `src/data/certificates.ts` |
| New team | `src/data/teams.ts` |
| New branch | `src/data/branches.ts` |
| New org message | `src/data/messages.ts` |

Then:

    npm run build

**No component changes. No page changes. No redesign.**

## Scripts

    npm run dev        # local dev server
    npm run build      # typecheck + static build → dist/
    npm run preview    # preview the production build
    npm run typecheck  # types only

## Demo data

All data files start with a `DEMO DATA` banner.
Replace the content, keep the shape, keep the IDs stable.

## Deploy to GitHub Pages

1. Push the repository to GitHub (branch `main`).
2. In the repository settings → **Pages** → Source: **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
4. Your site will be available at:
   - `https://<username>.github.io/<repo>/` for project pages.
   - `https://<username>.github.io/` for user pages.

> **Note on 404 fallback:**
> `public/404.html` handles client-side routes.
> If you use a **user page** (no repository sub-path), set `pathSegmentsToKeep = 0` inside `404.html`.
