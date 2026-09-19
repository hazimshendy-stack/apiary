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
