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
