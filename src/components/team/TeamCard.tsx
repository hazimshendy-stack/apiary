import { Link } from 'react-router-dom';
import type { TeamStats } from '@/lib/derive';

export function TeamCard({ stats }: { stats: TeamStats }) {
  const { team } = stats;
  const monogram = team.name.slice(0, 2).toUpperCase();

  return (
    <Link to={'/teams/' + team.id} className="card">
      <span
        className="team-card__accent"
        style={{ background: team.color }}
        aria-hidden="true"
      />
      <div className="team-card__head">
        <span
          className="team-card__mono"
          style={{ background: team.color + '1f', color: team.color }}
          aria-hidden="true"
        >
          {monogram}
        </span>
        <div>
          <div className="card__title">{team.name}</div>
          <div className="card__meta">{team.arabicName}</div>
        </div>
      </div>

      <p className="card__body">{team.tagline}</p>

      <div className="team-card__stats">
        <div>
          <div className="team-card__stat-value">{stats.memberCount}</div>
          <div className="team-card__stat-label">Members</div>
        </div>
        <div>
          <div className="team-card__stat-value">{stats.contributionCount}</div>
          <div className="team-card__stat-label">Contributions</div>
        </div>
        <div>
          <div className="team-card__stat-value" style={{ color: team.color }}>
            {stats.points}
          </div>
          <div className="team-card__stat-label">Points</div>
        </div>
      </div>
    </Link>
  );
}
