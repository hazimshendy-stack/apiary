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
