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
