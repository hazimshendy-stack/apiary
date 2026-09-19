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
