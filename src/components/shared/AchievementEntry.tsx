import { Link } from 'react-router-dom';
import type { Achievement } from '@/types';
import { getMemberById, getTeamById } from '@/lib/derive';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';

const LEVEL_COLOR: Record<Achievement['level'], string> = {
  branch: '#60A5FA',
  national: '#FFB020',
  international: '#A78BFA',
};

export function AchievementEntry({ achievement }: { achievement: Achievement }) {
  const color = LEVEL_COLOR[achievement.level];

  return (
    <article className="entry">
      <div className="entry__date">{formatDate(achievement.date)}</div>
      <div className="entry__body">
        <div className="row" style={{ gap: '8px' }}>
          <Badge color={color} dot>
            {achievement.level}
          </Badge>
        </div>
        <h3 className="entry__title mt-2">{achievement.title}</h3>
        <p className="entry__desc">{achievement.description}</p>
        <div className="entry__tags">
          {achievement.teamIds.map((id) => {
            const team = getTeamById(id);
            if (!team) return null;
            return (
              <Badge key={id} color={team.color}>
                {team.name}
              </Badge>
            );
          })}
          {achievement.memberIds.map((id) => {
            const member = getMemberById(id);
            if (!member) return null;
            return (
              <Link key={id} to={'/members/' + member.id}>
                <Badge neutral>{member.name}</Badge>
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
}
