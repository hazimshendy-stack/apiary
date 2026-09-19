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
