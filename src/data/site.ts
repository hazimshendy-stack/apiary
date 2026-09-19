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
