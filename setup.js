#!/usr/bin/env node
/**
 * APIARY — setup.js  (GitHub Pages edition)
 * ------------------------------------------------------------------
 * Scaffolds the complete static architecture for:
 *   "APIARY — Resala STEM Sub Branches · Season 7"
 *
 * Hosting: GitHub Pages only.
 * No Vercel. No Netlify. No external hosting.
 *
 * Run:  node setup.js
 * Then: npm install && npm run dev
 * ------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const files = {};
const file = (p, c) => {
  files[p] = c;
};

/* ==================================================================
 * 1. ROOT CONFIG
 * ================================================================== */

file(
  "package.json",
  `
{
  "name": "apiary",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "APIARY — Resala STEM Sub Branches Season 7",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@types/node": "^22.7.4",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.2",
    "typescript": "^5.6.2",
    "vite": "^5.4.8"
  }
}
`
);

file(
  "tsconfig.json",
  `
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
`
);

file(
  "vite.config.ts",
  `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: relative base so assets resolve from any sub-path.
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
});
`
);

file(
  ".gitignore",
  `
node_modules
dist
dist-ssr
*.local
.DS_Store
.env
.env.*
!.env.example
*.tsbuildinfo
`
);

/* ==================================================================
 * GITHUB PAGES — workflow + SPA fallback
 * ================================================================== */

file(
  ".github/workflows/deploy.yml",
  `
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
);

file(
  "public/404.html",
  `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>APIARY</title>
    <script type="text/javascript">
      // GitHub Pages SPA redirect.
      // For project pages (username.github.io/repo) keep pathSegmentsToKeep = 1.
      // For user pages (username.github.io) change to 0.
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`
);

file(
  "index.html",
  `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0B0E13" />
    <title>APIARY — Resala STEM Sub Branches · Season 7</title>
    <meta
      name="description"
      content="APIARY — the official platform of Resala STEM Sub Branches, Season 7. Members, teams, contributions, achievements and certificates."
    />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <script type="text/javascript">
      // Restore the route after GitHub Pages 404 redirect.
      (function (l) {
        if (l.search[1] === '/') {
          var decoded = l.search
            .slice(1)
            .split('&')
            .map(function (s) {
              return s.replace(/~and~/g, '&');
            })
            .join('?');
          window.history.replaceState(
            null,
            null,
            l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      })(window.location);
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
`
);

file(
  "public/favicon.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M32 3.5 57.5 18.2v27.6L32 60.5 6.5 45.8V18.2z" fill="#0B0E13" stroke="#FFB020" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="32" cy="32" r="8.5" fill="#FFB020"/>
</svg>
`
);

file(
  "public/robots.txt",
  `
User-agent: *
Allow: /
`
);

file(
  "README.md",
  `
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
| New member | \`src/data/members.ts\` |
| New contribution | \`src/data/contributions.ts\` |
| New achievement | \`src/data/achievements.ts\` |
| New certificate | \`src/data/certificates.ts\` |
| New team | \`src/data/teams.ts\` |
| New branch | \`src/data/branches.ts\` |
| New org message | \`src/data/messages.ts\` |

Then:

    npm run build

**No component changes. No page changes. No redesign.**

## Scripts

    npm run dev        # local dev server
    npm run build      # typecheck + static build → dist/
    npm run preview    # preview the production build
    npm run typecheck  # types only

## Demo data

All data files start with a \`DEMO DATA\` banner.
Replace the content, keep the shape, keep the IDs stable.

## Deploy to GitHub Pages

1. Push the repository to GitHub (branch \`main\`).
2. In the repository settings → **Pages** → Source: **GitHub Actions**.
3. The included workflow (\`.github/workflows/deploy.yml\`) builds and deploys automatically.
4. Your site will be available at:
   - \`https://<username>.github.io/<repo>/\` for project pages.
   - \`https://<username>.github.io/\` for user pages.

> **Note on 404 fallback:**
> \`public/404.html\` handles client-side routes.
> If you use a **user page** (no repository sub-path), set \`pathSegmentsToKeep = 0\` inside \`404.html\`.
`
);

/* ==================================================================
 * 2. STYLES
 * ================================================================== */

file(
  "src/styles/tokens.css",
  `
/* ============================================================
   APIARY — Design Tokens
   Single source of truth for the visual language.
   ============================================================ */

:root {
  /* --- Surfaces --- */
  --color-bg:          #0B0E13;
  --color-bg-soft:     #0F131A;
  --color-surface:     #141922;
  --color-surface-2:   #1A212C;
  --color-surface-3:   #222B38;
  --color-border:      #262F3D;
  --color-border-soft: #1D2531;

  /* --- Text --- */
  --color-text:        #E9EDF3;
  --color-text-soft:   #B7C2D2;
  --color-text-muted:  #8391A6;

  /* --- Brand --- */
  --color-primary:      #FFB020;
  --color-primary-soft: #FFD166;
  --color-primary-dim:  #7A5410;
  --color-accent:       #F59E0B;

  /* --- Semantic --- */
  --color-success: #34D399;
  --color-info:    #60A5FA;
  --color-danger:  #F87171;
  --color-purple:  #A78BFA;
  --color-pink:    #F472B6;
  --color-cyan:    #22D3EE;
  --color-orange:  #FB923C;

  /* --- Typography --- */
  --font-sans:    'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;

  /* --- Radius --- */
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius:    16px;
  --radius-lg: 24px;
  --radius-full: 999px;

  /* --- Spacing --- */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* --- Layout --- */
  --container: 1200px;
  --navbar-h: 68px;

  /* --- Effects --- */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow:    0 8px 24px -8px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 24px 60px -20px rgba(0, 0, 0, 0.8);
  --glow:      0 0 0 1px rgba(255, 176, 32, 0.25), 0 8px 32px -12px rgba(255, 176, 32, 0.35);

  --ease: cubic-bezier(0.2, 0.7, 0.3, 1);
}
`
);

file(
  "src/styles/global.css",
  `
/* ============================================================
   APIARY — Global styles & primitives
   ============================================================ */

*,
*::before,
*::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

html, body, #root { min-height: 100%; }

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-text);
  background:
    radial-gradient(1200px 700px at 15% -10%, rgba(255, 176, 32, 0.10), transparent 60%),
    radial-gradient(900px 600px at 95% 0%, rgba(96, 165, 250, 0.07), transparent 55%),
    var(--color-bg);
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.015em;
  margin: 0;
}

h1 { font-size: clamp(2.1rem, 5vw, 3.6rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); }
h3 { font-size: 1.1rem; }

p { margin: 0; }

a { color: inherit; text-decoration: none; }

img, svg { display: block; max-width: 100%; }

button, input, select, textarea { font: inherit; color: inherit; }

::selection { background: rgba(255, 176, 32, 0.3); }

::-webkit-scrollbar { width: 11px; height: 11px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb {
  background: var(--color-surface-3);
  border-radius: var(--radius-full);
  border: 3px solid var(--color-bg);
}
::-webkit-scrollbar-thumb:hover { background: var(--color-primary-dim); }

/* ---------- Shell ---------- */

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main { flex: 1; }

.container {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--space-5);
}

@media (max-width: 640px) {
  .container { padding-inline: var(--space-4); }
}

/* ---------- Navbar ---------- */

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--navbar-h);
  display: flex;
  align-items: center;
  background: rgba(11, 14, 19, 0.78);
  backdrop-filter: saturate(160%) blur(14px);
  -webkit-backdrop-filter: saturate(160%) blur(14px);
  border-bottom: 1px solid var(--color-border-soft);
}

.navbar__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  width: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.brand__mark {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: linear-gradient(150deg, var(--color-primary), var(--color-accent));
  color: #10131a;
  font-weight: 800;
  font-size: 0.85rem;
  box-shadow: var(--glow);
}

.brand__sub {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-text-muted);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-inline-start: auto;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-links::-webkit-scrollbar { display: none; }

.nav-link {
  position: relative;
  padding: 7px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--color-text-muted);
  white-space: nowrap;
  transition: color 0.18s var(--ease), background 0.18s var(--ease);
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-surface-2);
}

.nav-link.is-active {
  color: var(--color-primary);
  background: rgba(255, 176, 32, 0.1);
}

/* ---------- Sections ---------- */

.section { padding-block: var(--space-8); }
.section--tight { padding-block: var(--space-6); }

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
  flex-wrap: wrap;
}

.section-head__eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 6px;
}

.section-head__desc {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  max-width: 62ch;
  margin-top: 6px;
}

/* ---------- Hero ---------- */

.hero {
  position: relative;
  padding-block: var(--space-9) var(--space-8);
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 176, 32, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 176, 32, 0.05) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 30% 20%, black, transparent 72%);
  -webkit-mask-image: radial-gradient(circle at 30% 20%, black, transparent 72%);
  pointer-events: none;
}

.hero__inner { position: relative; z-index: 1; }

.hero__title {
  max-width: 18ch;
  margin-top: var(--space-4);
}

.hero__title em {
  font-style: normal;
  background: linear-gradient(100deg, var(--color-primary), var(--color-primary-soft));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__desc {
  margin-top: var(--space-4);
  max-width: 60ch;
  color: var(--color-text-soft);
  font-size: 1.02rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

/* ---------- Buttons ---------- */

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s var(--ease), background 0.18s var(--ease),
    border-color 0.18s var(--ease), box-shadow 0.18s var(--ease);
}

.btn:active { transform: translateY(1px); }

.btn--primary {
  background: linear-gradient(150deg, var(--color-primary), var(--color-accent));
  color: #10131a;
  box-shadow: var(--glow);
}

.btn--primary:hover {
  box-shadow: 0 0 0 1px rgba(255, 176, 32, 0.4), 0 12px 40px -14px rgba(255, 176, 32, 0.6);
}

.btn--ghost {
  background: var(--color-surface-2);
  border-color: var(--color-border);
  color: var(--color-text-soft);
}

.btn--ghost:hover {
  background: var(--color-surface-3);
  color: var(--color-text);
}

/* ---------- Cards ---------- */

.card {
  position: relative;
  display: block;
  background: linear-gradient(180deg, var(--color-surface), var(--color-bg-soft));
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius);
  padding: var(--space-5);
  transition: border-color 0.2s var(--ease), transform 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}

a.card:hover {
  border-color: var(--color-border);
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.card__title { font-size: 1rem; font-weight: 600; }

.card__meta {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.card__body {
  margin-top: 10px;
  font-size: 0.88rem;
  color: var(--color-text-soft);
}

/* ---------- Grid ---------- */

.grid {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.grid--wide { grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }
.grid--narrow { grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); }

/* ---------- Badge ---------- */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  white-space: nowrap;
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.badge--neutral {
  background: var(--color-surface-2);
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

/* ---------- Avatar ---------- */

.avatar {
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  font-family: var(--font-display);
  font-weight: 700;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.07);
  user-select: none;
}

/* ---------- Stats ---------- */

.stat-row {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.stat {
  background: linear-gradient(180deg, var(--color-surface), var(--color-bg-soft));
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius);
  padding: var(--space-5);
}

.stat__value {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-primary);
}

.stat__label {
  margin-top: 8px;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ---------- Member card ---------- */

.member-card {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.member-card__body { min-width: 0; }

.member-card__name {
  font-size: 0.98rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-card__role {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.member-card__teams {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

/* ---------- Team card ---------- */

.team-card__accent {
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 3px;
  border-radius: var(--radius) var(--radius) 0 0;
}

.team-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.team-card__mono {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.team-card__stats {
  display: flex;
  gap: var(--space-5);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-soft);
}

.team-card__stat-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
}

.team-card__stat-label {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ---------- Table ---------- */

.table-wrap {
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--color-bg-soft);
}

table.data {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

table.data th {
  text-align: left;
  padding: 13px 18px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-soft);
  white-space: nowrap;
}

table.data td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--color-border-soft);
  vertical-align: middle;
}

table.data tr:last-child td { border-bottom: none; }

table.data tbody tr { transition: background 0.15s var(--ease); }
table.data tbody tr:hover { background: var(--color-surface); }

.rank {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-text-muted);
  width: 48px;
}

.rank--1 { color: #FFD166; }
.rank--2 { color: #CBD5E1; }
.rank--3 { color: #E8A87C; }

.points {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-primary);
}

/* ---------- Filters ---------- */

.toolbar {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: var(--space-5);
}

.input {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  font-size: 0.88rem;
  outline: none;
  min-width: 220px;
  transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease);
}

.input::placeholder { color: var(--color-text-muted); }

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 176, 32, 0.12);
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 7px 14px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.16s var(--ease);
}

.chip:hover { color: var(--color-text); border-color: var(--color-surface-3); }

.chip.is-active {
  background: rgba(255, 176, 32, 0.12);
  border-color: rgba(255, 176, 32, 0.45);
  color: var(--color-primary);
}

/* ---------- Timeline / list ---------- */

.entry {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius);
  background: linear-gradient(180deg, var(--color-surface), var(--color-bg-soft));
  transition: border-color 0.18s var(--ease);
}

.entry:hover { border-color: var(--color-border); }

.entry__date {
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  flex-shrink: 0;
  width: 96px;
  padding-top: 2px;
}

.entry__body { min-width: 0; flex: 1; }

.entry__title { font-size: 0.98rem; font-weight: 600; }

.entry__desc {
  margin-top: 6px;
  font-size: 0.87rem;
  color: var(--color-text-soft);
}

.entry__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.stack { display: flex; flex-direction: column; gap: var(--space-4); }
.stack--sm { gap: var(--space-3); }
.row { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }

/* ---------- Profile header ---------- */

.profile {
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
  flex-wrap: wrap;
  padding: var(--space-6);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(600px 260px at 0% 0%, rgba(255, 176, 32, 0.10), transparent 70%),
    linear-gradient(180deg, var(--color-surface), var(--color-bg-soft));
}

.profile__main { flex: 1; min-width: 260px; }

.profile__name { font-size: clamp(1.6rem, 3vw, 2.2rem); }

.profile__role { color: var(--color-primary); font-weight: 600; margin-top: 6px; }

.profile__bio {
  margin-top: var(--space-4);
  color: var(--color-text-soft);
  max-width: 68ch;
}

.profile__side {
  display: grid;
  gap: var(--space-4);
  min-width: 190px;
}

.kv { display: flex; flex-direction: column; gap: 3px; }
.kv__k {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.kv__v { font-size: 0.9rem; font-weight: 500; }

/* ---------- Footer ---------- */

.footer {
  margin-top: var(--space-9);
  border-top: 1px solid var(--color-border-soft);
  background: var(--color-bg-soft);
  padding-block: var(--space-7);
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.footer__note { color: var(--color-text-muted); font-size: 0.82rem; max-width: 46ch; }

.footer__links { display: flex; gap: var(--space-5); flex-wrap: wrap; }

.footer__link {
  font-size: 0.84rem;
  color: var(--color-text-muted);
  transition: color 0.16s var(--ease);
}

.footer__link:hover { color: var(--color-primary); }

/* ---------- Empty / 404 ---------- */

.empty {
  padding: var(--space-8) var(--space-5);
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text-muted);
}

.notfound {
  display: grid;
  place-items: center;
  text-align: center;
  padding-block: var(--space-9);
}

.notfound__code {
  font-family: var(--font-display);
  font-size: clamp(4rem, 14vw, 8rem);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(120deg, var(--color-primary), var(--color-primary-dim));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---------- Utilities ---------- */

.muted { color: var(--color-text-muted); }
.soft { color: var(--color-text-soft); }
.mono { font-family: var(--font-display); }
.small { font-size: 0.82rem; }
.tiny { font-size: 0.74rem; }
.center { text-align: center; }
.nowrap { white-space: nowrap; }
.mt-2 { margin-top: var(--space-2); }
.mt-3 { margin-top: var(--space-3); }
.mt-4 { margin-top: var(--space-4); }
.mt-5 { margin-top: var(--space-5); }
.mt-6 { margin-top: var(--space-6); }
.mb-4 { margin-bottom: var(--space-4); }

.divider {
  height: 1px;
  background: var(--color-border-soft);
  margin-block: var(--space-6);
}

@media (max-width: 720px) {
  .entry { flex-direction: column; gap: var(--space-2); }
  .entry__date { width: auto; }
  .brand__sub { display: none; }
  .hero { padding-block: var(--space-8) var(--space-7); }
}
`
);

/* ==================================================================
 * 3. TYPES
 * ================================================================== */

file(
  "src/types/index.ts",
  `
/* ============================================================
   APIARY — Domain types
   The single contract between data files and the UI.
   Change a type here → TypeScript shows you every place to update.
   ============================================================ */

export type TeamId =
  | 'helpers'
  | 'heroes'
  | 'coders'
  | 'enviros'
  | 'messages'
  | 'masar'
  | 'rstc';

export type AchievementLevel = 'branch' | 'national' | 'international';

export interface Branch {
  id: string;
  name: string;
  arabicName: string;
  city: string;
  founded: string;
}

export interface Team {
  id: TeamId;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  color: string;
}

export interface Member {
  id: string;
  name: string;
  arabicName: string;
  role: string;
  teamIds: TeamId[];
  branchId: string;
  joinedSeason: number;
  bio?: string;
  email?: string;
  links?: { label: string; url: string }[];
}

export interface Contribution {
  id: string;
  memberId: string;
  teamId: TeamId;
  title: string;
  description: string;
  date: string;
  impact: number;
  tags?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  level: AchievementLevel;
  teamIds: TeamId[];
  memberIds: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  memberId: string;
  date: string;
  credentialId?: string;
}

export interface OrgMessage {
  id: string;
  from: string;
  role: string;
  title: string;
  body: string;
  date: string;
}

export interface Season {
  id: number;
  label: string;
  theme: string;
  start: string;
  end: string;
  isActive: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  organization: string;
  season: string;
  email: string;
  social: { label: string; url: string }[];
}
`
);

file(
  "src/vite-env.d.ts",
  `
/// <reference types="vite/client" />
`
);

/* ==================================================================
 * 4. DEMO DATA  (all files begin with a DEMO DATA banner)
 * ================================================================== */

file(
  "src/data/site.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   Replace with real organizational data before launch.
   ============================================================ */

import type { SiteConfig, Season } from '@/types';

export const site: SiteConfig = {
  name: 'APIARY',
  tagline: 'Resala STEM Sub Branches — Season 7',
  description:
    'The official platform of Resala STEM Sub Branches. One hive, seven teams, one season of building, teaching and giving back.',
  organization: 'Resala STEM',
  season: 'Season 7',
  email: 'hello@apiary.resala-stem.org',
  social: [
    { label: 'Facebook', url: 'https://facebook.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'GitHub', url: 'https://github.com' },
  ],
};

export const seasons: Season[] = [
  { id: 7, label: 'Season 7', theme: 'Build. Teach. Give back.', start: '2025-09-01', end: '2026-06-30', isActive: true },
  { id: 6, label: 'Season 6', theme: 'Reach further.', start: '2024-09-01', end: '2025-06-30', isActive: false },
];

export const activeSeason: Season = seasons.find((s) => s.isActive) ?? seasons[0];
`
);

file(
  "src/data/branches.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   ============================================================ */

import type { Branch } from '@/types';

export const branches: Branch[] = [
  { id: 'nasr-city', name: 'Nasr City Branch', arabicName: 'فرع مدينة نصر', city: 'Cairo', founded: '2019-03-01' },
  { id: 'maadi', name: 'Maadi Branch', arabicName: 'فرع المعادي', city: 'Cairo', founded: '2020-09-01' },
  { id: 'october', name: '6th of October Branch', arabicName: 'فرع ٦ أكتوبر', city: 'Giza', founded: '2021-02-01' },
  { id: 'alexandria', name: 'Alexandria Branch', arabicName: 'فرع الإسكندرية', city: 'Alexandria', founded: '2021-10-01' },
  { id: 'mansoura', name: 'Mansoura Branch', arabicName: 'فرع المنصورة', city: 'Dakahlia', founded: '2022-09-01' },
];
`
);

file(
  "src/data/teams.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   Keep the IDs stable: they are referenced across the whole app.
   ============================================================ */

import type { Team } from '@/types';

export const teams: Team[] = [
  {
    id: 'helpers',
    name: 'Helpers',
    arabicName: 'المساعدون',
    tagline: 'Support that never sleeps.',
    description:
      'The backbone of every sub-branch. Helpers handle logistics, mentoring, onboarding and the day-to-day operations that keep the hive running.',
    color: '#FFB020',
  },
  {
    id: 'heroes',
    name: 'Heroes',
    arabicName: 'الأبطال',
    tagline: 'First in, last out.',
    description:
      'Heroes lead field activities, community outreach and large-scale volunteering campaigns across all sub-branches.',
    color: '#FB923C',
  },
  {
    id: 'coders',
    name: 'Coders',
    arabicName: 'المبرمجون',
    tagline: 'Turning ideas into shipped software.',
    description:
      'Coders design and build the tools, platforms and automations used by the organization — from internal dashboards to public products.',
    color: '#60A5FA',
  },
  {
    id: 'enviros',
    name: 'Enviros',
    arabicName: 'فريق البيئة',
    tagline: 'For a cleaner, greener branch.',
    description:
      'Enviros run sustainability programs: recycling drives, tree planting, awareness campaigns and green campus initiatives.',
    color: '#34D399',
  },
  {
    id: 'messages',
    name: 'Messages',
    arabicName: 'فريق الرسائل',
    tagline: 'The voice of the organization.',
    description:
      'Messages craft the narrative — content, media, documentation and the communication that carries our work to the world.',
    color: '#A78BFA',
  },
  {
    id: 'masar',
    name: 'Masar',
    arabicName: 'مسار',
    tagline: 'Guiding the next step.',
    description:
      'Masar supports students with guidance, career paths, mentorship tracks and the skills that school never teaches.',
    color: '#F472B6',
  },
  {
    id: 'rstc',
    name: 'RSTC',
    arabicName: 'آر إس تي سي',
    tagline: 'Standards, training and quality.',
    description:
      'The Resala STEM Training Center sets the curriculum, trains the trainers and guarantees the quality of every program we deliver.',
    color: '#22D3EE',
  },
];
`
);

file(
  "src/data/members.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   To add a member: append one object. Nothing else to change.
   ============================================================ */

import type { Member } from '@/types';

export const members: Member[] = [
  {
    id: 'm-01',
    name: 'Yassin Abdelrahman',
    arabicName: 'ياسين عبد الرحمن',
    role: 'Head of Season 7',
    teamIds: ['helpers', 'rstc'],
    branchId: 'nasr-city',
    joinedSeason: 5,
    bio: 'Leads the Season 7 hive across all sub-branches. Focused on structure, mentorship and shipping real outcomes.',
    email: 'yassin@apiary.org',
    links: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
  },
  {
    id: 'm-02',
    name: 'Malak Hesham',
    arabicName: 'ملك هشام',
    role: 'Coders Lead',
    teamIds: ['coders'],
    branchId: 'nasr-city',
    joinedSeason: 5,
    bio: 'Full-stack engineer. Builds the internal tooling and the public platform you are looking at right now.',
    email: 'malak@apiary.org',
  },
  {
    id: 'm-03',
    name: 'Omar Khaled',
    arabicName: 'عمر خالد',
    role: 'Heroes Lead',
    teamIds: ['heroes'],
    branchId: 'maadi',
    joinedSeason: 6,
    bio: 'Organizes field campaigns and community outreach across Cairo and Giza.',
  },
  {
    id: 'm-04',
    name: 'Nour El-Sayed',
    arabicName: 'نور السيد',
    role: 'Enviros Lead',
    teamIds: ['enviros'],
    branchId: 'october',
    joinedSeason: 6,
    bio: 'Environmental science graduate. Runs the recycling and tree-planting programs.',
  },
  {
    id: 'm-05',
    name: 'Hana Mostafa',
    arabicName: 'هنا مصطفى',
    role: 'Messages Lead',
    teamIds: ['messages'],
    branchId: 'nasr-city',
    joinedSeason: 6,
    bio: 'Content strategist. Documents the season and shapes how the organization speaks.',
  },
  {
    id: 'm-06',
    name: 'Ali Gamal',
    arabicName: 'علي جمال',
    role: 'Masar Lead',
    teamIds: ['masar'],
    branchId: 'alexandria',
    joinedSeason: 7,
    bio: 'Mentorship and career guidance tracks for high-school students.',
  },
  {
    id: 'm-07',
    name: 'Salma Adel',
    arabicName: 'سلمى عادل',
    role: 'RSTC Coordinator',
    teamIds: ['rstc'],
    branchId: 'nasr-city',
    joinedSeason: 5,
    bio: 'Designs the training curriculum and certifies trainers across branches.',
  },
  {
    id: 'm-08',
    name: 'Ziad Tarek',
    arabicName: 'زياد طارق',
    role: 'Senior Helper',
    teamIds: ['helpers'],
    branchId: 'maadi',
    joinedSeason: 7,
    bio: 'Onboarding, logistics and everything nobody else wants to do — happily.',
  },
  {
    id: 'm-09',
    name: 'Farida Nabil',
    arabicName: 'فريدة نبيل',
    role: 'Frontend Developer',
    teamIds: ['coders'],
    branchId: 'october',
    joinedSeason: 7,
    bio: 'Builds accessible interfaces and the component library.',
  },
  {
    id: 'm-10',
    name: 'Yousef Ashraf',
    arabicName: 'يوسف أشرف',
    role: 'Field Hero',
    teamIds: ['heroes', 'enviros'],
    branchId: 'mansoura',
    joinedSeason: 7,
    bio: 'Leads the Mansoura volunteering campaigns.',
  },
  {
    id: 'm-11',
    name: 'Jana Mahmoud',
    arabicName: 'جنى محمود',
    role: 'Sustainability Officer',
    teamIds: ['enviros'],
    branchId: 'alexandria',
    joinedSeason: 7,
    bio: 'Measures and reports the environmental impact of every program.',
  },
  {
    id: 'm-12',
    name: 'Kareem Samir',
    arabicName: 'كريم سمير',
    role: 'Masar Mentor',
    teamIds: ['masar', 'rstc'],
    branchId: 'alexandria',
    joinedSeason: 7,
    bio: 'Mentors students on study paths and technical skills.',
  },
  {
    id: 'm-13',
    name: 'Layla Ibrahim',
    arabicName: 'ليلى إبراهيم',
    role: 'Media & Documentation',
    teamIds: ['messages'],
    branchId: 'maadi',
    joinedSeason: 7,
    bio: 'Photo, video and archive. Nothing happened if it is not documented.',
  },
  {
    id: 'm-14',
    name: 'Ahmed Fouad',
    arabicName: 'أحمد فؤاد',
    role: 'Operations Helper',
    teamIds: ['helpers', 'rstc'],
    branchId: 'nasr-city',
    joinedSeason: 7,
    bio: 'Coordinates between branches and keeps the schedule honest.',
  },
];
`
);

file(
  "src/data/contributions.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   To add a contribution: append one object. Points recalculate
   automatically — nothing else to change.
   ============================================================ */

import type { Contribution } from '@/types';

export const contributions: Contribution[] = [
  {
    id: 'c-01',
    memberId: 'm-02',
    teamId: 'coders',
    title: 'Shipped the APIARY platform',
    description:
      'Designed and built the full static platform: design system, data layer, derived analytics and 12 pages.',
    date: '2026-02-14',
    impact: 96,
    tags: ['typescript', 'architecture', 'design-system'],
  },
  {
    id: 'c-02',
    memberId: 'm-09',
    teamId: 'coders',
    title: 'Component library v1',
    description:
      'Built 18 reusable components with full keyboard accessibility and dark-theme tokens.',
    date: '2026-01-22',
    impact: 82,
    tags: ['react', 'accessibility'],
  },
  {
    id: 'c-03',
    memberId: 'm-03',
    teamId: 'heroes',
    title: 'Ramadan field campaign',
    description:
      'Organized 9 field days across 4 branches, reaching over 1,400 families with supplies and support.',
    date: '2026-03-05',
    impact: 94,
    tags: ['outreach', 'logistics'],
  },
  {
    id: 'c-04',
    memberId: 'm-10',
    teamId: 'heroes',
    title: 'Mansoura volunteering drive',
    description: 'Recruited and trained 60 new volunteers in a single weekend.',
    date: '2025-11-18',
    impact: 71,
    tags: ['recruitment', 'training'],
  },
  {
    id: 'c-05',
    memberId: 'm-04',
    teamId: 'enviros',
    title: 'Campus recycling program',
    description:
      'Installed 24 sorting stations and set up a weekly collection partnership with a local recycler.',
    date: '2026-01-09',
    impact: 88,
    tags: ['sustainability', 'operations'],
  },
  {
    id: 'c-06',
    memberId: 'm-11',
    teamId: 'enviros',
    title: 'Impact measurement framework',
    description:
      'Defined the metrics used to report environmental impact across all Season 7 programs.',
    date: '2026-02-02',
    impact: 67,
    tags: ['data', 'reporting'],
  },
  {
    id: 'c-07',
    memberId: 'm-05',
    teamId: 'messages',
    title: 'Season 7 brand identity',
    description:
      'New visual identity, tone of voice and content guidelines adopted by all seven sub-teams.',
    date: '2025-10-12',
    impact: 90,
    tags: ['brand', 'design'],
  },
  {
    id: 'c-08',
    memberId: 'm-13',
    teamId: 'messages',
    title: 'Full season archive',
    description:
      'Photographed and catalogued 32 events, producing the official Season 7 media archive.',
    date: '2026-03-20',
    impact: 64,
    tags: ['media', 'archive'],
  },
  {
    id: 'c-09',
    memberId: 'm-06',
    teamId: 'masar',
    title: 'Masar mentorship track',
    description:
      'Launched a 12-week mentorship track pairing 45 students with 20 mentors.',
    date: '2025-12-01',
    impact: 85,
    tags: ['mentorship', 'education'],
  },
  {
    id: 'c-10',
    memberId: 'm-12',
    teamId: 'masar',
    title: 'Study-path workshops',
    description: 'Delivered 6 workshops on choosing a university path and building a portfolio.',
    date: '2026-02-19',
    impact: 58,
    tags: ['workshops'],
  },
  {
    id: 'c-11',
    memberId: 'm-07',
    teamId: 'rstc',
    title: 'Train-the-trainer curriculum',
    description:
      'Wrote the 8-module curriculum now used to certify every trainer in the organization.',
    date: '2025-10-30',
    impact: 92,
    tags: ['curriculum', 'training'],
  },
  {
    id: 'c-12',
    memberId: 'm-14',
    teamId: 'helpers',
    title: 'Cross-branch coordination system',
    description:
      'Introduced a shared calendar and handoff protocol that cut scheduling conflicts by 70%.',
    date: '2026-01-15',
    impact: 73,
    tags: ['operations', 'process'],
  },
  {
    id: 'c-13',
    memberId: 'm-08',
    teamId: 'helpers',
    title: 'Onboarding pipeline',
    description: 'Redesigned onboarding from 3 weeks to 5 days for new sub-branch members.',
    date: '2025-11-05',
    impact: 79,
    tags: ['onboarding', 'process'],
  },
  {
    id: 'c-14',
    memberId: 'm-01',
    teamId: 'helpers',
    title: 'Season 7 operating model',
    description:
      'Defined the structure, ownership and reporting lines for all seven sub-teams.',
    date: '2025-09-20',
    impact: 95,
    tags: ['strategy', 'structure'],
  },
  {
    id: 'c-15',
    memberId: 'm-02',
    teamId: 'coders',
    title: 'Analytics engine',
    description:
      'Built the derivation layer that computes points, rankings and team stats directly from the data files.',
    date: '2026-01-05',
    impact: 87,
    tags: ['typescript', 'data'],
  },
  {
    id: 'c-16',
    memberId: 'm-10',
    teamId: 'enviros',
    title: 'Tree planting day',
    description: 'Planted 300 trees with 120 student volunteers across two governorates.',
    date: '2025-12-14',
    impact: 76,
    tags: ['environment', 'volunteering'],
  },
];
`
);

file(
  "src/data/achievements.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   ============================================================ */

import type { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'a-01',
    title: 'Best STEM Sub-Branch — Season 6',
    description:
      'Awarded to the Nasr City sub-branch for overall performance, member growth and program quality.',
    date: '2025-07-10',
    level: 'national',
    teamIds: ['helpers', 'rstc'],
    memberIds: ['m-01', 'm-07', 'm-14'],
  },
  {
    id: 'a-02',
    title: 'National Volunteering Award',
    description:
      'Recognized for the Ramadan field campaign and its measurable community impact.',
    date: '2026-03-28',
    level: 'national',
    teamIds: ['heroes'],
    memberIds: ['m-03', 'm-10'],
  },
  {
    id: 'a-03',
    title: 'Green Campus Certification',
    description:
      'Three sub-branches certified for meeting the sustainability criteria set by the Enviros team.',
    date: '2026-02-11',
    level: 'branch',
    teamIds: ['enviros'],
    memberIds: ['m-04', 'm-11'],
  },
  {
    id: 'a-04',
    title: 'Best Educational Program',
    description:
      'The Masar mentorship track won the regional award for student development programs.',
    date: '2026-01-30',
    level: 'national',
    teamIds: ['masar'],
    memberIds: ['m-06', 'm-12'],
  },
  {
    id: 'a-05',
    title: 'Trainer Certification — 40 trainers',
    description:
      'RSTC certified 40 trainers across five sub-branches within a single season.',
    date: '2025-12-20',
    level: 'branch',
    teamIds: ['rstc'],
    memberIds: ['m-07', 'm-14'],
  },
  {
    id: 'a-06',
    title: 'Open Source Contribution Recognition',
    description:
      'The Coders team was recognized for publishing the internal tooling as open source.',
    date: '2026-02-25',
    level: 'international',
    teamIds: ['coders'],
    memberIds: ['m-02', 'm-09'],
  },
  {
    id: 'a-07',
    title: 'Media Excellence Award',
    description:
      'The Season 7 brand identity and media archive were recognized at the annual organization showcase.',
    date: '2026-03-15',
    level: 'branch',
    teamIds: ['messages'],
    memberIds: ['m-05', 'm-13'],
  },
  {
    id: 'a-08',
    title: 'Season 7 Overall Excellence',
    description:
      'The hive exceeded every Season 7 target: members, contributions, programs and impact.',
    date: '2026-04-02',
    level: 'national',
    teamIds: ['helpers', 'heroes', 'coders', 'enviros', 'messages', 'masar', 'rstc'],
    memberIds: ['m-01'],
  },
];
`
);

file(
  "src/data/certificates.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   ============================================================ */

import type { Certificate } from '@/types';

export const certificates: Certificate[] = [
  { id: 'cert-01', title: 'Certified STEM Trainer', issuer: 'RSTC', memberId: 'm-07', date: '2025-10-18', credentialId: 'RSTC-T-1042' },
  { id: 'cert-02', title: 'Certified STEM Trainer', issuer: 'RSTC', memberId: 'm-14', date: '2025-11-02', credentialId: 'RSTC-T-1088' },
  { id: 'cert-03', title: 'Certified STEM Trainer', issuer: 'RSTC', memberId: 'm-12', date: '2026-01-12', credentialId: 'RSTC-T-1150' },
  { id: 'cert-04', title: 'TypeScript Professional', issuer: 'Microsoft', memberId: 'm-02', date: '2025-09-28', credentialId: 'MS-TS-77821' },
  { id: 'cert-05', title: 'Front-End Accessibility Specialist', issuer: 'IAAP', memberId: 'm-09', date: '2026-02-06', credentialId: 'IAAP-WAS-3310' },
  { id: 'cert-06', title: 'Environmental Impact Analyst', issuer: 'Green Future Institute', memberId: 'm-11', date: '2025-12-09', credentialId: 'GFI-EIA-552' },
  { id: 'cert-07', title: 'Sustainability Program Manager', issuer: 'Green Future Institute', memberId: 'm-04', date: '2025-11-21', credentialId: 'GFI-SPM-410' },
  { id: 'cert-08', title: 'Community Leadership Certificate', issuer: 'Resala STEM', memberId: 'm-03', date: '2025-08-30', credentialId: 'RS-CL-2201' },
  { id: 'cert-09', title: 'Community Leadership Certificate', issuer: 'Resala STEM', memberId: 'm-10', date: '2026-01-25', credentialId: 'RS-CL-2318' },
  { id: 'cert-10', title: 'Content Strategy Professional', issuer: 'CIM', memberId: 'm-05', date: '2025-10-05', credentialId: 'CIM-CS-9042' },
  { id: 'cert-11', title: 'Mentorship Practitioner', issuer: 'Resala STEM', memberId: 'm-06', date: '2025-12-16', credentialId: 'RS-MP-1177' },
  { id: 'cert-12', title: 'Project Management Fundamentals', issuer: 'PMI', memberId: 'm-01', date: '2025-09-14', credentialId: 'PMI-PMF-6603' },
  { id: 'cert-13', title: 'Media Production Certificate', issuer: 'Resala STEM', memberId: 'm-13', date: '2026-03-02', credentialId: 'RS-MP-2402' },
  { id: 'cert-14', title: 'Operations & Logistics Certificate', issuer: 'Resala STEM', memberId: 'm-08', date: '2026-02-20', credentialId: 'RS-OL-2410' },
];
`
);

file(
  "src/data/messages.ts",
  `
/* ============================================================
   DEMO DATA — sample content for development only.
   ============================================================ */

import type { OrgMessage } from '@/types';

export const messages: OrgMessage[] = [
  {
    id: 'msg-01',
    from: 'Yassin Abdelrahman',
    role: 'Head of Season 7',
    title: 'Season 7 is ours to build',
    body:
      'Seven teams, five branches, one season. Everything we ship this year will be measured by one question: did it make someone\\'s path easier? Let us answer it loudly.',
    date: '2025-09-05',
  },
  {
    id: 'msg-02',
    from: 'Salma Adel',
    role: 'RSTC Coordinator',
    title: 'Forty trainers certified',
    body:
      'We crossed forty certified trainers this season. That is forty people who can now teach hundreds. Training is the highest-leverage thing we do.',
    date: '2025-12-21',
  },
  {
    id: 'msg-03',
    from: 'Nour El-Sayed',
    role: 'Enviros Lead',
    title: 'Three branches, one standard',
    body:
      'Three sub-branches passed the Green Campus criteria this season. The standard is now documented — any branch can reach it.',
    date: '2026-02-12',
  },
  {
    id: 'msg-04',
    from: 'Malak Hesham',
    role: 'Coders Lead',
    title: 'The platform is live',
    body:
      'APIARY is shipped. Static, fast, and fully data-driven — adding a member is now a one-line change followed by a build.',
    date: '2026-02-15',
  },
  {
    id: 'msg-05',
    from: 'Ali Gamal',
    role: 'Masar Lead',
    title: 'Forty-five students, twenty mentors',
    body:
      'The first Masar mentorship cohort is complete. Every single student finished the twelve weeks. We are doubling the cohort next season.',
    date: '2026-03-08',
  },
];
`
);

file(
  "src/data/index.ts",
  `
/* ============================================================
   APIARY — data barrel
   Import from '@/data' when you need more than one dataset.
   The individual files remain the single source of truth.
   ============================================================ */

export { site, seasons, activeSeason } from './site';
export { branches } from './branches';
export { teams } from './teams';
export { members } from './members';
export { contributions } from './contributions';
export { achievements } from './achievements';
export { certificates } from './certificates';
export { messages } from './messages';
`
);

/* ==================================================================
 * 5. LIB — automatic calculations
 * ================================================================== */

file(
  "src/lib/format.ts",
  `
/* ============================================================
   APIARY — formatting helpers (pure, no domain knowledge)
   ============================================================ */

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatMonth(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

export function initials(name: string): string {
  const parts = name.trim().split(/\\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural ?? singular + 's';
}

export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
`
);

file(
  "src/lib/derive.ts",
  `
/* ============================================================
   APIARY — Automatic Calculations Layer
   ------------------------------------------------------------
   EVERY number shown anywhere on the site is computed here
   from the data files. Nothing is hardcoded in components.

   Add data  →  this file recalculates  →  the UI updates.
   ============================================================ */

import type {
  Achievement,
  AchievementLevel,
  Branch,
  Certificate,
  Contribution,
  Member,
  Team,
  TeamId,
} from '@/types';

import { members } from '@/data/members';
import { teams } from '@/data/teams';
import { branches } from '@/data/branches';
import { contributions } from '@/data/contributions';
import { achievements } from '@/data/achievements';
import { certificates } from '@/data/certificates';
import { sortByDateDesc } from '@/lib/format';

/* ------------------------------------------------------------
   Scoring model — the only place points are defined.
   ------------------------------------------------------------ */

export const POINTS = {
  contributionBase: 10,
  contributionImpactDivisor: 10,
  certificate: 15,
} as const;

export const ACHIEVEMENT_WEIGHT: Record<AchievementLevel, number> = {
  branch: 10,
  national: 25,
  international: 50,
};

/* ------------------------------------------------------------
   Lookups
   ------------------------------------------------------------ */

export function getTeamById(id: TeamId): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getBranchById(id: string): Branch | undefined {
  return branches.find((b) => b.id === id);
}

export function getMemberById(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

export function getMemberName(id: string): string {
  return getMemberById(id)?.name ?? 'Unknown member';
}

/* ------------------------------------------------------------
   Member ↔ relations
   ------------------------------------------------------------ */

export function getMembersByTeam(teamId: TeamId): Member[] {
  return members.filter((m) => m.teamIds.includes(teamId));
}

export function getMembersByBranch(branchId: string): Member[] {
  return members.filter((m) => m.branchId === branchId);
}

export function getContributionsByMember(memberId: string): Contribution[] {
  return sortByDateDesc(contributions.filter((c) => c.memberId === memberId));
}

export function getContributionsByTeam(teamId: TeamId): Contribution[] {
  return sortByDateDesc(contributions.filter((c) => c.teamId === teamId));
}

export function getAchievementsByMember(memberId: string): Achievement[] {
  return sortByDateDesc(achievements.filter((a) => a.memberIds.includes(memberId)));
}

export function getAchievementsByTeam(teamId: TeamId): Achievement[] {
  return sortByDateDesc(achievements.filter((a) => a.teamIds.includes(teamId)));
}

export function getCertificatesByMember(memberId: string): Certificate[] {
  return sortByDateDesc(certificates.filter((c) => c.memberId === memberId));
}

/* ------------------------------------------------------------
   Derived scores
   ------------------------------------------------------------ */

export function getContributionPoints(contribution: Contribution): number {
  return (
    POINTS.contributionBase +
    Math.round(contribution.impact / POINTS.contributionImpactDivisor)
  );
}

export function getMemberPoints(memberId: string): number {
  const contributionPoints = contributions
    .filter((c) => c.memberId === memberId)
    .reduce((sum, c) => sum + getContributionPoints(c), 0);

  const achievementPoints = achievements
    .filter((a) => a.memberIds.includes(memberId))
    .reduce((sum, a) => sum + ACHIEVEMENT_WEIGHT[a.level], 0);

  const certificatePoints =
    certificates.filter((c) => c.memberId === memberId).length * POINTS.certificate;

  return contributionPoints + achievementPoints + certificatePoints;
}

export interface LeaderboardEntry {
  member: Member;
  points: number;
  contributions: number;
  achievements: number;
  certificates: number;
  teams: Team[];
}

export function getLeaderboard(): LeaderboardEntry[] {
  return members
    .map((member) => ({
      member,
      points: getMemberPoints(member.id),
      contributions: contributions.filter((c) => c.memberId === member.id).length,
      achievements: achievements.filter((a) => a.memberIds.includes(member.id)).length,
      certificates: certificates.filter((c) => c.memberId === member.id).length,
      teams: member.teamIds
        .map((id) => getTeamById(id))
        .filter((t): t is Team => Boolean(t)),
    }))
    .sort((a, b) => b.points - a.points || a.member.name.localeCompare(b.member.name));
}

export function getMemberRank(memberId: string): number {
  const board = getLeaderboard();
  const index = board.findIndex((e) => e.member.id === memberId);
  return index === -1 ? 0 : index + 1;
}

/* ------------------------------------------------------------
   Team stats
   ------------------------------------------------------------ */

export interface TeamStats {
  team: Team;
  memberCount: number;
  contributionCount: number;
  achievementCount: number;
  certificateCount: number;
  points: number;
  avgImpact: number;
}

export function getTeamStats(teamId: TeamId): TeamStats {
  const team = getTeamById(teamId);
  const teamMembers = getMembersByTeam(teamId);
  const teamContributions = contributions.filter((c) => c.teamId === teamId);
  const teamAchievements = achievements.filter((a) => a.teamIds.includes(teamId));
  const teamMemberIds = new Set(teamMembers.map((m) => m.id));
  const teamCertificates = certificates.filter((c) => teamMemberIds.has(c.memberId));

  const points = teamMembers.reduce((sum, m) => sum + getMemberPoints(m.id), 0);

  const avgImpact =
    teamContributions.length === 0
      ? 0
      : Math.round(
          teamContributions.reduce((sum, c) => sum + c.impact, 0) /
            teamContributions.length,
        );

  return {
    team: team as Team,
    memberCount: teamMembers.length,
    contributionCount: teamContributions.length,
    achievementCount: teamAchievements.length,
    certificateCount: teamCertificates.length,
    points,
    avgImpact,
  };
}

export function getAllTeamStats(): TeamStats[] {
  return teams
    .map((t) => getTeamStats(t.id))
    .sort((a, b) => b.points - a.points);
}

/* ------------------------------------------------------------
   Organization stats
   ------------------------------------------------------------ */

export interface OrgStats {
  members: number;
  teams: number;
  branches: number;
  contributions: number;
  achievements: number;
  certificates: number;
  messages: number;
  totalPoints: number;
  avgImpact: number;
}

export function getOrgStats(): OrgStats {
  const totalPoints = members.reduce((sum, m) => sum + getMemberPoints(m.id), 0);
  const avgImpact =
    contributions.length === 0
      ? 0
      : Math.round(
          contributions.reduce((sum, c) => sum + c.impact, 0) / contributions.length,
        );

  return {
    members: members.length,
    teams: teams.length,
    branches: branches.length,
    contributions: contributions.length,
    achievements: achievements.length,
    certificates: certificates.length,
    messages: 0,
    totalPoints,
    avgImpact,
  };
}

/* ------------------------------------------------------------
   Global feeds
   ------------------------------------------------------------ */

export function getLatestContributions(limit = 6): Contribution[] {
  return sortByDateDesc(contributions).slice(0, limit);
}

export function getLatestAchievements(limit = 6): Achievement[] {
  return sortByDateDesc(achievements).slice(0, limit);
}

export function getLatestCertificates(limit = 8): Certificate[] {
  return sortByDateDesc(certificates).slice(0, limit);
}

export function getTopMembers(limit = 5): LeaderboardEntry[] {
  return getLeaderboard().slice(0, limit);
}

export function getBranchDistribution(): { branch: Branch; count: number }[] {
  return branches
    .map((branch) => ({ branch, count: getMembersByBranch(branch.id).length }))
    .sort((a, b) => b.count - a.count);
}

export function getTeamDistribution(): { team: Team; count: number }[] {
  return teams
    .map((team) => ({ team, count: getMembersByTeam(team.id).length }))
    .sort((a, b) => b.count - a.count);
}

export function getAchievementLevelCounts(): Record<AchievementLevel, number> {
  return achievements.reduce<Record<AchievementLevel, number>>(
    (acc, a) => {
      acc[a.level] += 1;
      return acc;
    },
    { branch: 0, national: 0, international: 0 },
  );
}
`
);

/* ==================================================================
 * 6. UI COMPONENTS
 * ================================================================== */

file(
  "src/components/ui/Avatar.tsx",
  `
import { cx, hashString, initials } from '@/lib/format';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ name, size = 52, className }: AvatarProps) {
  const hue = hashString(name) % 360;
  const style = {
    width: size,
    height: size,
    fontSize: Math.max(11, Math.round(size * 0.36)),
    background: 'hsl(' + hue + ' 55% 16%)',
    color: 'hsl(' + hue + ' 85% 68%)',
  };

  return (
    <span className={cx('avatar', className)} style={style} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
`
);

file(
  "src/components/ui/Badge.tsx",
  `
import type { ReactNode } from 'react';
import { cx } from '@/lib/format';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  neutral?: boolean;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, color, neutral, dot, className }: BadgeProps) {
  if (neutral || !color) {
    return <span className={cx('badge badge--neutral', className)}>{children}</span>;
  }

  const style = {
    background: color + '1f',
    borderColor: color + '59',
    color,
  };

  return (
    <span className={cx('badge', className)} style={style}>
      {dot ? <span className="badge__dot" /> : null}
      {children}
    </span>
  );
}
`
);

file(
  "src/components/ui/Card.tsx",
  `
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '@/lib/format';

interface CardProps {
  children: ReactNode;
  to?: string;
  className?: string;
}

export function Card({ children, to, className }: CardProps) {
  if (to) {
    return (
      <Link to={to} className={cx('card', className)}>
        {children}
      </Link>
    );
  }
  return <div className={cx('card', className)}>{children}</div>;
}
`
);

file(
  "src/components/ui/Stat.tsx",
  `
interface StatProps {
  value: number | string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="stat">
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return <div className="stat-row">{children}</div>;
}
`
);

file(
  "src/components/ui/SectionHeader.tsx",
  `
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="section-head">
      <div>
        {eyebrow ? <div className="section-head__eyebrow">{eyebrow}</div> : null}
        <h2>{title}</h2>
        {description ? <p className="section-head__desc">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
`
);

file(
  "src/components/ui/EmptyState.tsx",
  `
interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return <div className="empty">{message}</div>;
}
`
);

file(
  "src/components/ui/PageHeader.tsx",
  `
import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="section section--tight">
      {eyebrow ? <div className="section-head__eyebrow">{eyebrow}</div> : null}
      <h1>{title}</h1>
      {description ? (
        <p className="hero__desc" style={{ marginTop: '16px' }}>
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}
`
);

file(
  "src/components/member/MemberCard.tsx",
  `
import { Link } from 'react-router-dom';
import type { Member } from '@/types';
import { getTeamById } from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export function MemberCard({ member }: { member: Member }) {
  return (
    <Link to={'/members/' + member.id} className="card member-card">
      <Avatar name={member.name} />
      <div className="member-card__body">
        <div className="member-card__name">{member.name}</div>
        <div className="member-card__role">{member.role}</div>
        <div className="member-card__teams">
          {member.teamIds.map((id) => {
            const team = getTeamById(id);
            if (!team) return null;
            return (
              <Badge key={id} color={team.color}>
                {team.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
`
);

file(
  "src/components/team/TeamCard.tsx",
  `
import { Link } from 'react-router-dom';
import type { TeamStats } from '@/lib/derive';

export function TeamCard({ stats }: { stats: TeamStats }) {
  const { team } = stats;
  const monogram = team.name.slice(0, 2).toUpperCase();

  return (
    <Link to={'/teams/' + team.id} className="card">
      <span
        className="team-card__accent"
        style={{ background: team.color }}
        aria-hidden="true"
      />
      <div className="team-card__head">
        <span
          className="team-card__mono"
          style={{ background: team.color + '1f', color: team.color }}
          aria-hidden="true"
        >
          {monogram}
        </span>
        <div>
          <div className="card__title">{team.name}</div>
          <div className="card__meta">{team.arabicName}</div>
        </div>
      </div>

      <p className="card__body">{team.tagline}</p>

      <div className="team-card__stats">
        <div>
          <div className="team-card__stat-value">{stats.memberCount}</div>
          <div className="team-card__stat-label">Members</div>
        </div>
        <div>
          <div className="team-card__stat-value">{stats.contributionCount}</div>
          <div className="team-card__stat-label">Contributions</div>
        </div>
        <div>
          <div className="team-card__stat-value" style={{ color: team.color }}>
            {stats.points}
          </div>
          <div className="team-card__stat-label">Points</div>
        </div>
      </div>
    </Link>
  );
}
`
);

file(
  "src/components/shared/ContributionEntry.tsx",
  `
import { Link } from 'react-router-dom';
import type { Contribution } from '@/types';
import { getMemberById, getTeamById } from '@/lib/derive';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';

export function ContributionEntry({ contribution }: { contribution: Contribution }) {
  const member = getMemberById(contribution.memberId);
  const team = getTeamById(contribution.teamId);

  return (
    <article className="entry">
      <div className="entry__date">{formatDate(contribution.date)}</div>
      <div className="entry__body">
        <h3 className="entry__title">{contribution.title}</h3>
        <p className="entry__desc">{contribution.description}</p>
        <div className="entry__tags">
          {team ? <Badge color={team.color}>{team.name}</Badge> : null}
          {member ? (
            <Link to={'/members/' + member.id}>
              <Badge neutral>{member.name}</Badge>
            </Link>
          ) : null}
          {contribution.tags?.map((tag) => (
            <Badge key={tag} neutral>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
`
);

file(
  "src/components/shared/AchievementEntry.tsx",
  `
import { Link } from 'react-router-dom';
import type { Achievement } from '@/types';
import { getMemberById, getTeamById } from '@/lib/derive';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';

const LEVEL_COLOR: Record<Achievement['level'], string> = {
  branch: '#60A5FA',
  national: '#FFB020',
  international: '#A78BFA',
};

export function AchievementEntry({ achievement }: { achievement: Achievement }) {
  const color = LEVEL_COLOR[achievement.level];

  return (
    <article className="entry">
      <div className="entry__date">{formatDate(achievement.date)}</div>
      <div className="entry__body">
        <div className="row" style={{ gap: '8px' }}>
          <Badge color={color} dot>
            {achievement.level}
          </Badge>
        </div>
        <h3 className="entry__title mt-2">{achievement.title}</h3>
        <p className="entry__desc">{achievement.description}</p>
        <div className="entry__tags">
          {achievement.teamIds.map((id) => {
            const team = getTeamById(id);
            if (!team) return null;
            return (
              <Badge key={id} color={team.color}>
                {team.name}
              </Badge>
            );
          })}
          {achievement.memberIds.map((id) => {
            const member = getMemberById(id);
            if (!member) return null;
            return (
              <Link key={id} to={'/members/' + member.id}>
                <Badge neutral>{member.name}</Badge>
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
}
`
);

/* ==================================================================
 * 7. LAYOUT
 * ================================================================== */

file(
  "src/components/layout/Navbar.tsx",
  `
import { NavLink } from 'react-router-dom';
import { site, activeSeason } from '@/data';
import { cx } from '@/lib/format';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/members', label: 'Members' },
  { to: '/teams', label: 'Teams' },
  { to: '/league', label: 'League' },
  { to: '/contributions', label: 'Contributions' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/messages', label: 'Messages' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  return (
    <header className="navbar">
      <nav className="container navbar__inner" aria-label="Main navigation">
        <NavLink to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">A</span>
          <span>
            {site.name}
            <span className="brand__sub" style={{ display: 'block' }}>
              {activeSeason.label}
            </span>
          </span>
        </NavLink>

        <div className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => cx('nav-link', isActive && 'is-active')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
`
);

file(
  "src/components/layout/Footer.tsx",
  `
import { Link } from 'react-router-dom';
import { site, activeSeason } from '@/data';
import { getOrgStats } from '@/lib/derive';

export function Footer() {
  const stats = getOrgStats();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="brand" style={{ marginBottom: '12px' }}>
            <span className="brand__mark" aria-hidden="true">A</span>
            <span>{site.name}</span>
          </div>
          <p className="footer__note">
            {site.organization} — {activeSeason.label}. {stats.members} members,
            {' '}{stats.teams} teams, {stats.contributions} contributions.
          </p>
        </div>

        <div className="footer__links">
          {site.social.map((item) => (
            <a
              key={item.label}
              className="footer__link"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          ))}
          <Link className="footer__link" to="/about">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
`
);

file(
  "src/components/layout/Layout.tsx",
  `
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
`
);

/* ==================================================================
 * 8. PAGES
 * ================================================================== */

file(
  "src/pages/HomePage.tsx",
  `
import { Link } from 'react-router-dom';
import { site, activeSeason } from '@/data';
import {
  getAllTeamStats,
  getLatestAchievements,
  getLatestContributions,
  getOrgStats,
  getTopMembers,
} from '@/lib/derive';
import { messages } from '@/data/messages';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamCard } from '@/components/team/TeamCard';
import { ContributionEntry } from '@/components/shared/ContributionEntry';
import { AchievementEntry } from '@/components/shared/AchievementEntry';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';

export function HomePage() {
  const stats = getOrgStats();
  const teamStats = getAllTeamStats();
  const topMembers = getTopMembers(5);
  const latestContributions = getLatestContributions(4);
  const latestAchievements = getLatestAchievements(3);
  const latestMessage = messages[0];

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <Badge color="#FFB020" dot>
            {activeSeason.label} · {activeSeason.theme}
          </Badge>

          <h1 className="hero__title">
            One hive. <em>Seven teams.</em> One season of building.
          </h1>

          <p className="hero__desc">
            {site.description}
          </p>

          <div className="hero__actions">
            <Link to="/members" className="btn btn--primary">
              Explore the members
            </Link>
            <Link to="/league" className="btn btn--ghost">
              View the league
            </Link>
          </div>
        </div>
      </section>

      <section className="container section--tight">
        <StatRow>
          <Stat value={stats.members} label="Members" />
          <Stat value={stats.teams} label="Sub-teams" />
          <Stat value={stats.contributions} label="Contributions" />
          <Stat value={stats.achievements} label="Achievements" />
          <Stat value={stats.certificates} label="Certificates" />
          <Stat value={stats.totalPoints} label="Total points" />
        </StatRow>
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="The hive"
          title="Seven sub-teams, one mission"
          description="Every team owns a domain. Every domain is measured by the same standard."
          action={
            <Link to="/teams" className="btn btn--ghost">
              All teams
            </Link>
          }
        />
        <div className="grid">
          {teamStats.map((teamStat) => (
            <TeamCard key={teamStat.team.id} stats={teamStat} />
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="League"
          title="Top contributors this season"
          description="Points are calculated automatically from contributions, achievements and certificates."
          action={
            <Link to="/league" className="btn btn--ghost">
              Full league
            </Link>
          }
        />
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>#</th>
                <th>Member</th>
                <th>Role</th>
                <th>Contributions</th>
                <th>Achievements</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {topMembers.map((entry, index) => (
                <tr key={entry.member.id}>
                  <td className={'rank rank--' + (index + 1)}>{index + 1}</td>
                  <td>
                    <Link to={'/members/' + entry.member.id} className="row">
                      <Avatar name={entry.member.name} size={34} />
                      <span>{entry.member.name}</span>
                    </Link>
                  </td>
                  <td className="muted small">{entry.member.role}</td>
                  <td>{entry.contributions}</td>
                  <td>{entry.achievements}</td>
                  <td className="points">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="Recent work"
          title="Latest contributions"
          action={
            <Link to="/contributions" className="btn btn--ghost">
              All contributions
            </Link>
          }
        />
        <div className="stack">
          {latestContributions.map((contribution) => (
            <ContributionEntry key={contribution.id} contribution={contribution} />
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionHeader
          eyebrow="Recognition"
          title="Latest achievements"
          action={
            <Link to="/achievements" className="btn btn--ghost">
              All achievements
            </Link>
          }
        />
        <div className="stack">
          {latestAchievements.map((achievement) => (
            <AchievementEntry key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </section>

      {latestMessage ? (
        <section className="container section">
          <SectionHeader eyebrow="From the hive" title="Latest message" />
          <article className="card" style={{ padding: '32px' }}>
            <div className="row">
              <Avatar name={latestMessage.from} size={48} />
              <div>
                <div className="card__title">{latestMessage.from}</div>
                <div className="card__meta">{latestMessage.role}</div>
              </div>
              <span className="card__meta" style={{ marginInlineStart: 'auto' }}>
                {formatDate(latestMessage.date)}
              </span>
            </div>
            <h3 className="mt-5">{latestMessage.title}</h3>
            <p className="card__body">{latestMessage.body}</p>
            <Link to="/messages" className="btn btn--ghost mt-5">
              Read all messages
            </Link>
          </article>
        </section>
      ) : null}
    </>
  );
}
`
);

file(
  "src/pages/MembersPage.tsx",
  `
import { useMemo, useState } from 'react';
import { members } from '@/data/members';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { MemberCard } from '@/components/member/MemberCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { cx } from '@/lib/format';

export function MembersPage() {
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState<TeamId | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesTeam = teamFilter === 'all' || member.teamIds.includes(teamFilter);
      const matchesQuery =
        q.length === 0 ||
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.arabicName.includes(query.trim());
      return matchesTeam && matchesQuery;
    });
  }, [query, teamFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="The hive"
        title="Members"
        description="Every member of Resala STEM Sub Branches, Season 7 — one profile, one source of truth, used across the entire platform."
      />

      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search by name or role…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="chips">
          <button
            type="button"
            className={cx('chip', teamFilter === 'all' && 'is-active')}
            onClick={() => setTeamFilter('all')}
          >
            All teams
          </button>
          {teams.map((team) => (
            <button
              key={team.id}
              type="button"
              className={cx('chip', teamFilter === team.id && 'is-active')}
              onClick={() => setTeamFilter(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No members match your search." />
      ) : (
        <div className="grid grid--wide">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
`
);

file(
  "src/pages/MemberProfilePage.tsx",
  `
import { Link, useParams } from 'react-router-dom';
import {
  getAchievementsByMember,
  getBranchById,
  getCertificatesByMember,
  getContributionsByMember,
  getMemberById,
  getMemberPoints,
  getMemberRank,
  getTeamById,
} from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContributionEntry } from '@/components/shared/ContributionEntry';
import { AchievementEntry } from '@/components/shared/AchievementEntry';
import { EmptyState } from '@/components/ui/EmptyState';
import { NotFoundPage } from './NotFoundPage';
import { formatDate } from '@/lib/format';

export function MemberProfilePage() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = memberId ? getMemberById(memberId) : undefined;

  if (!member) return <NotFoundPage />;

  const branch = getBranchById(member.branchId);
  const contributions = getContributionsByMember(member.id);
  const achievements = getAchievementsByMember(member.id);
  const certificates = getCertificatesByMember(member.id);

  return (
    <div className="container section--tight">
      <div className="profile">
        <Avatar name={member.name} size={104} />

        <div className="profile__main">
          <h1 className="profile__name">{member.name}</h1>
          <div className="muted small">{member.arabicName}</div>
          <div className="profile__role">{member.role}</div>
          {member.bio ? <p className="profile__bio">{member.bio}</p> : null}

          <div className="row mt-5">
            {member.teamIds.map((id) => {
              const team = getTeamById(id);
              if (!team) return null;
              return (
                <Link key={id} to={'/teams/' + team.id}>
                  <Badge color={team.color} dot>
                    {team.name}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="profile__side">
          <div className="kv">
            <span className="kv__k">Branch</span>
            <span className="kv__v">{branch ? branch.name : '—'}</span>
          </div>
          <div className="kv">
            <span className="kv__k">Joined</span>
            <span className="kv__v">Season {member.joinedSeason}</span>
          </div>
          <div className="kv">
            <span className="kv__k">League rank</span>
            <span className="kv__v">#{getMemberRank(member.id)}</span>
          </div>
          <div className="kv">
            <span className="kv__k">Points</span>
            <span className="kv__v" style={{ color: 'var(--color-primary)' }}>
              {getMemberPoints(member.id)}
            </span>
          </div>
          {member.email ? (
            <div className="kv">
              <span className="kv__k">Contact</span>
              <a className="kv__v" href={'mailto:' + member.email}>
                {member.email}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <section className="section">
        <StatRow>
          <Stat value={contributions.length} label="Contributions" />
          <Stat value={achievements.length} label="Achievements" />
          <Stat value={certificates.length} label="Certificates" />
          <Stat value={getMemberPoints(member.id)} label="Total points" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Work" title="Contributions" />
        {contributions.length === 0 ? (
          <EmptyState message="No contributions recorded yet." />
        ) : (
          <div className="stack">
            {contributions.map((contribution) => (
              <ContributionEntry key={contribution.id} contribution={contribution} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeader eyebrow="Recognition" title="Achievements" />
        {achievements.length === 0 ? (
          <EmptyState message="No achievements recorded yet." />
        ) : (
          <div className="stack">
            {achievements.map((achievement) => (
              <AchievementEntry key={achievement.id} achievement={achievement} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeader eyebrow="Credentials" title="Certificates" />
        {certificates.length === 0 ? (
          <EmptyState message="No certificates recorded yet." />
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Certificate</th>
                  <th>Issuer</th>
                  <th>Credential ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((certificate) => (
                  <tr key={certificate.id}>
                    <td>{certificate.title}</td>
                    <td className="muted">{certificate.issuer}</td>
                    <td className="mono small muted">{certificate.credentialId ?? '—'}</td>
                    <td className="muted small nowrap">{formatDate(certificate.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/TeamsPage.tsx",
  `
import { getAllTeamStats } from '@/lib/derive';
import { TeamCard } from '@/components/team/TeamCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatRow, Stat } from '@/components/ui/Stat';
import { getOrgStats } from '@/lib/derive';

export function TeamsPage() {
  const teamStats = getAllTeamStats();
  const orgStats = getOrgStats();

  return (
    <div className="container">
      <PageHeader
        eyebrow="Structure"
        title="Sub-teams"
        description="Seven specialized teams operating across five sub-branches. Each team has one owner, one domain and one measurable output."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={orgStats.teams} label="Sub-teams" />
          <Stat value={orgStats.members} label="Members" />
          <Stat value={orgStats.branches} label="Branches" />
          <Stat value={orgStats.contributions} label="Contributions" />
        </StatRow>
      </section>

      <section className="section">
        <div className="grid grid--wide">
          {teamStats.map((stats) => (
            <TeamCard key={stats.team.id} stats={stats} />
          ))}
        </div>
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/TeamDetailPage.tsx",
  `
import { useParams } from 'react-router-dom';
import type { TeamId } from '@/types';
import {
  getAchievementsByTeam,
  getContributionsByTeam,
  getMembersByTeam,
  getTeamById,
  getTeamStats,
} from '@/lib/derive';
import { MemberCard } from '@/components/member/MemberCard';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContributionEntry } from '@/components/shared/ContributionEntry';
import { AchievementEntry } from '@/components/shared/AchievementEntry';
import { EmptyState } from '@/components/ui/EmptyState';
import { NotFoundPage } from './NotFoundPage';

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = teamId ? getTeamById(teamId as TeamId) : undefined;

  if (!team) return <NotFoundPage />;

  const stats = getTeamStats(team.id);
  const teamMembers = getMembersByTeam(team.id);
  const teamContributions = getContributionsByTeam(team.id);
  const teamAchievements = getAchievementsByTeam(team.id);

  return (
    <div className="container section--tight">
      <div className="profile">
        <span
          className="team-card__mono"
          style={{
            background: team.color + '1f',
            color: team.color,
            width: 84,
            height: 84,
            fontSize: '1.6rem',
            borderRadius: 22,
          }}
          aria-hidden="true"
        >
          {team.name.slice(0, 2).toUpperCase()}
        </span>

        <div className="profile__main">
          <h1 className="profile__name">{team.name}</h1>
          <div className="muted small">{team.arabicName}</div>
          <div className="profile__role" style={{ color: team.color }}>
            {team.tagline}
          </div>
          <p className="profile__bio">{team.description}</p>
        </div>
      </div>

      <section className="section">
        <StatRow>
          <Stat value={stats.memberCount} label="Members" />
          <Stat value={stats.contributionCount} label="Contributions" />
          <Stat value={stats.achievementCount} label="Achievements" />
          <Stat value={stats.certificateCount} label="Certificates" />
          <Stat value={stats.points} label="Team points" />
          <Stat value={stats.avgImpact + '%'} label="Avg. impact" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader eyebrow="People" title="Members" />
        {teamMembers.length === 0 ? (
          <EmptyState message="No members assigned to this team yet." />
        ) : (
          <div className="grid grid--wide">
            {teamMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeader eyebrow="Work" title="Contributions" />
        {teamContributions.length === 0 ? (
          <EmptyState message="No contributions recorded for this team yet." />
        ) : (
          <div className="stack">
            {teamContributions.map((contribution) => (
              <ContributionEntry key={contribution.id} contribution={contribution} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeader eyebrow="Recognition" title="Achievements" />
        {teamAchievements.length === 0 ? (
          <EmptyState message="No achievements recorded for this team yet." />
        ) : (
          <div className="stack">
            {teamAchievements.map((achievement) => (
              <AchievementEntry key={achievement.id} achievement={achievement} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/LeaguePage.tsx",
  `
import { Link } from 'react-router-dom';
import {
  getAchievementLevelCounts,
  getLeaderboard,
  getOrgStats,
} from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function LeaguePage() {
  const board = getLeaderboard();
  const orgStats = getOrgStats();
  const levels = getAchievementLevelCounts();

  return (
    <div className="container">
      <PageHeader
        eyebrow="Season 7"
        title="The League"
        description="Rankings are derived automatically from contributions (base 10 + impact/10), achievements (branch 10 · national 25 · international 50) and certificates (15 each). No manual updates, ever."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={board.length} label="Ranked members" />
          <Stat value={orgStats.totalPoints} label="Total points" />
          <Stat value={levels.branch} label="Branch awards" />
          <Stat value={levels.national} label="National awards" />
          <Stat value={levels.international} label="International awards" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Standings" title="Member ranking" />
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>#</th>
                <th>Member</th>
                <th>Teams</th>
                <th>Contributions</th>
                <th>Achievements</th>
                <th>Certificates</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {board.map((entry, index) => (
                <tr key={entry.member.id}>
                  <td className={'rank rank--' + (index + 1)}>{index + 1}</td>
                  <td>
                    <Link to={'/members/' + entry.member.id} className="row">
                      <Avatar name={entry.member.name} size={34} />
                      <span>
                        {entry.member.name}
                        <span className="muted small" style={{ display: 'block' }}>
                          {entry.member.role}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td>
                    <div className="row" style={{ gap: 6 }}>
                      {entry.teams.map((team) => (
                        <Badge key={team.id} color={team.color}>
                          {team.name}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td>{entry.contributions}</td>
                  <td>{entry.achievements}</td>
                  <td>{entry.certificates}</td>
                  <td className="points">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/ContributionsPage.tsx",
  `
import { useMemo, useState } from 'react';
import { contributions } from '@/data/contributions';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContributionEntry } from '@/components/shared/ContributionEntry';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stat, StatRow } from '@/components/ui/Stat';
import { getOrgStats } from '@/lib/derive';
import { cx } from '@/lib/format';

export function ContributionsPage() {
  const [teamFilter, setTeamFilter] = useState<TeamId | 'all'>('all');
  const stats = getOrgStats();

  const filtered = useMemo(() => {
    const list =
      teamFilter === 'all'
        ? contributions
        : contributions.filter((c) => c.teamId === teamFilter);
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [teamFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="Output"
        title="Contributions"
        description="Every recorded piece of work this season. Add an entry to src/data/contributions.ts and points recalculate everywhere."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.contributions} label="Total contributions" />
          <Stat value={stats.avgImpact + '%'} label="Average impact" />
          <Stat value={stats.teams} label="Contributing teams" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <div className="chips">
          <button
            type="button"
            className={cx('chip', teamFilter === 'all' && 'is-active')}
            onClick={() => setTeamFilter('all')}
          >
            All
          </button>
          {teams.map((team) => (
            <button
              key={team.id}
              type="button"
              className={cx('chip', teamFilter === team.id && 'is-active')}
              onClick={() => setTeamFilter(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No contributions match this filter." />
      ) : (
        <div className="stack">
          {filtered.map((contribution) => (
            <ContributionEntry key={contribution.id} contribution={contribution} />
          ))}
        </div>
      )}
    </div>
  );
}
`
);

file(
  "src/pages/AchievementsPage.tsx",
  `
import { useMemo, useState } from 'react';
import { achievements } from '@/data/achievements';
import type { AchievementLevel } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { AchievementEntry } from '@/components/shared/AchievementEntry';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stat, StatRow } from '@/components/ui/Stat';
import { getAchievementLevelCounts } from '@/lib/derive';
import { cx } from '@/lib/format';

const LEVELS: Array<AchievementLevel | 'all'> = ['all', 'branch', 'national', 'international'];

export function AchievementsPage() {
  const [levelFilter, setLevelFilter] = useState<AchievementLevel | 'all'>('all');
  const counts = getAchievementLevelCounts();

  const filtered = useMemo(() => {
    const list =
      levelFilter === 'all'
        ? achievements
        : achievements.filter((a) => a.level === levelFilter);
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [levelFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="Recognition"
        title="Achievements"
        description="Awards, certifications and milestones earned by the hive this season — at branch, national and international level."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={counts.branch} label="Branch level" />
          <Stat value={counts.national} label="National level" />
          <Stat value={counts.international} label="International level" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <div className="chips">
          {LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              className={cx('chip', levelFilter === level && 'is-active')}
              onClick={() => setLevelFilter(level)}
            >
              {level === 'all' ? 'All levels' : level}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No achievements match this filter." />
      ) : (
        <div className="stack">
          {filtered.map((achievement) => (
            <AchievementEntry key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}
    </div>
  );
}
`
);

file(
  "src/pages/CertificatesPage.tsx",
  `
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { certificates } from '@/data/certificates';
import { getMemberById } from '@/lib/derive';
import { PageHeader } from '@/components/ui/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stat, StatRow } from '@/components/ui/Stat';
import { formatDate } from '@/lib/format';

export function CertificatesPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = certificates.filter((certificate) => {
      if (q.length === 0) return true;
      const member = getMemberById(certificate.memberId);
      return (
        certificate.title.toLowerCase().includes(q) ||
        certificate.issuer.toLowerCase().includes(q) ||
        (member ? member.name.toLowerCase().includes(q) : false)
      );
    });
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query]);

  const issuers = new Set(certificates.map((c) => c.issuer)).size;
  const holders = new Set(certificates.map((c) => c.memberId)).size;

  return (
    <div className="container">
      <PageHeader
        eyebrow="Credentials"
        title="Certificates"
        description="Verified certifications held by our members — issued by RSTC and external organizations."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={certificates.length} label="Certificates" />
          <Stat value={holders} label="Certified members" />
          <Stat value={issuers} label="Issuing bodies" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <input
          className="input"
          type="search"
          placeholder="Search certificates, issuers or members…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No certificates match your search." />
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Certificate</th>
                <th>Member</th>
                <th>Issuer</th>
                <th>Credential ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((certificate) => {
                const member = getMemberById(certificate.memberId);
                return (
                  <tr key={certificate.id}>
                    <td>{certificate.title}</td>
                    <td>
                      {member ? (
                        <Link to={'/members/' + member.id} className="row">
                          <Avatar name={member.name} size={30} />
                          <span>{member.name}</span>
                        </Link>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>
                    <td className="muted">{certificate.issuer}</td>
                    <td className="mono small muted">{certificate.credentialId ?? '—'}</td>
                    <td className="muted small nowrap">{formatDate(certificate.date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
`
);

file(
  "src/pages/MessagesPage.tsx",
  `
import { messages } from '@/data/messages';
import { PageHeader } from '@/components/ui/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/format';

export function MessagesPage() {
  const sorted = [...messages].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="container">
      <PageHeader
        eyebrow="The hive"
        title="Messages"
        description="Notes and updates from the people leading Season 7."
      />

      <section className="section">
        {sorted.length === 0 ? (
          <EmptyState message="No messages published yet." />
        ) : (
          <div className="stack">
            {sorted.map((message) => (
              <article key={message.id} className="card" style={{ padding: '28px' }}>
                <div className="row">
                  <Avatar name={message.from} size={46} />
                  <div>
                    <div className="card__title">{message.from}</div>
                    <div className="card__meta">{message.role}</div>
                  </div>
                  <span className="card__meta" style={{ marginInlineStart: 'auto' }}>
                    {formatDate(message.date)}
                  </span>
                </div>
                <h3 className="mt-5">{message.title}</h3>
                <p className="card__body">{message.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/AboutPage.tsx",
  `
import { site, activeSeason, seasons } from '@/data';
import { branches } from '@/data/branches';
import { getBranchDistribution, getOrgStats, getAllTeamStats } from '@/lib/derive';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Stat, StatRow } from '@/components/ui/Stat';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';

export function AboutPage() {
  const stats = getOrgStats();
  const branchDistribution = getBranchDistribution();
  const teamStats = getAllTeamStats();
  const maxBranch = Math.max(1, ...branchDistribution.map((b) => b.count));

  return (
    <div className="container">
      <PageHeader
        eyebrow="About"
        title={site.name}
        description={site.description}
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.members} label="Members" />
          <Stat value={stats.teams} label="Sub-teams" />
          <Stat value={stats.branches} label="Branches" />
          <Stat value={stats.contributions} label="Contributions" />
          <Stat value={stats.achievements} label="Achievements" />
          <Stat value={stats.certificates} label="Certificates" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Current season"
          title={activeSeason.label}
          description={activeSeason.theme}
        />
        <div className="grid grid--wide">
          <div className="card">
            <div className="kv">
              <span className="kv__k">Season</span>
              <span className="kv__v">{activeSeason.label}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">Starts</span>
              <span className="kv__v">{formatDate(activeSeason.start)}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">Ends</span>
              <span className="kv__v">{formatDate(activeSeason.end)}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">Status</span>
              <span className="kv__v">
                <Badge color="#34D399" dot>
                  Active
                </Badge>
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card__title">Season history</div>
            <div className="stack stack--sm mt-4">
              {seasons.map((season) => (
                <div key={season.id} className="row" style={{ justifyContent: 'space-between' }}>
                  <span>{season.label}</span>
                  <span className="muted small">{season.theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Reach"
          title="Sub-branches"
          description="Where the hive operates this season."
        />
        <div className="grid grid--wide">
          {branchDistribution.map(({ branch, count }) => (
            <div key={branch.id} className="card">
              <div className="card__title">{branch.name}</div>
              <div className="card__meta">{branch.arabicName} · {branch.city}</div>
              <div className="row mt-4" style={{ justifyContent: 'space-between' }}>
                <span className="muted small">{count} members</span>
                <span className="muted small">Since {formatDate(branch.founded)}</span>
              </div>
              <div
                style={{
                  marginTop: 12,
                  height: 6,
                  borderRadius: 999,
                  background: 'var(--color-surface-3)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: Math.round((count / maxBranch) * 100) + '%',
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Structure"
          title="Team ranking"
          description="Computed from member performance across all teams."
        />
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Team</th>
                <th>Members</th>
                <th>Contributions</th>
                <th>Achievements</th>
                <th>Avg. impact</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teamStats.map((entry) => (
                <tr key={entry.team.id}>
                  <td>
                    <span className="row" style={{ gap: 8 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 3,
                          background: entry.team.color,
                        }}
                      />
                      {entry.team.name}
                    </span>
                  </td>
                  <td>{entry.memberCount}</td>
                  <td>{entry.contributionCount}</td>
                  <td>{entry.achievementCount}</td>
                  <td>{entry.avgImpact}%</td>
                  <td className="points">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Contact" title="Get in touch" />
        <div className="card">
          <div className="kv">
            <span className="kv__k">Email</span>
            <a className="kv__v" href={'mailto:' + site.email}>
              {site.email}
            </a>
          </div>
          <div className="row mt-4">
            {site.social.map((item) => (
              <a
                key={item.label}
                className="btn btn--ghost"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`
);

file(
  "src/pages/NotFoundPage.tsx",
  `
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container notfound">
      <div className="notfound__code">404</div>
      <h2 className="mt-4">This cell of the hive is empty</h2>
      <p className="muted mt-3">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn--primary mt-6">
        Back to the hive
      </Link>
    </div>
  );
}
`
);

/* ==================================================================
 * 9. APP + ROUTER + ENTRY
 * ================================================================== */

file(
  "src/App.tsx",
  `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { MembersPage } from '@/pages/MembersPage';
import { MemberProfilePage } from '@/pages/MemberProfilePage';
import { TeamsPage } from '@/pages/TeamsPage';
import { TeamDetailPage } from '@/pages/TeamDetailPage';
import { LeaguePage } from '@/pages/LeaguePage';
import { ContributionsPage } from '@/pages/ContributionsPage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { CertificatesPage } from '@/pages/CertificatesPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:memberId" element={<MemberProfilePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:teamId" element={<TeamDetailPage />} />
          <Route path="/league" element={<LeaguePage />} />
          <Route path="/contributions" element={<ContributionsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
`
);

file(
  "src/main.tsx",
  `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found in index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`
);

/* ==================================================================
 * WRITE EVERYTHING
 * ================================================================== */

function write() {
  const entries = Object.entries(files);
  let written = 0;

  for (const [relative, raw] of entries) {
    const absolute = path.join(ROOT, relative);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, raw.replace(/^\n/, ""), "utf8");
    written += 1;
  }

  const dirs = new Set(
    entries.map(([relative]) => path.dirname(relative)).filter((d) => d !== ".")
  );

  console.log("");
  console.log("  ⬢  APIARY — setup complete (GitHub Pages edition)");
  console.log("  ─────────────────────────────────────────────────");
  console.log("  Files written : " + written);
  console.log("  Folders       : " + dirs.size);
  console.log("");
  console.log("  Next steps:");
  console.log("");
  console.log("    1)  npm install");
  console.log("    2)  npm run dev");
  console.log("    3)  open http://localhost:5173");
  console.log("");
  console.log("  To deploy on GitHub Pages:");
  console.log("");
  console.log('    1)  git init && git add . && git commit -m "init"');
  console.log("    2)  git remote add origin <your-repo-url>");
  console.log("    3)  git push -u origin main");
  console.log("    4)  GitHub → Settings → Pages → Source: GitHub Actions");
  console.log("");
  console.log(
    "  The workflow .github/workflows/deploy.yml will build and deploy."
  );
  console.log("");
}

write();
