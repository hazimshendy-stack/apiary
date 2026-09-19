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
