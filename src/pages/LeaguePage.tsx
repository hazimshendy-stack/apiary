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
