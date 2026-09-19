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
