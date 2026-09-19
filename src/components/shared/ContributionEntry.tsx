import { Link } from 'react-router-dom';
import type { Contribution } from '@/types';
import { getMemberById, getTeamById } from '@/lib/derive';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';

export function ContributionEntry({ contribution }: { contribution: Contribution }) {
  const member = getMemberById(contribution.memberId);
  const team = getTeamById(contribution.teamId);

  return (
    <article className="entry">
      <div className="entry__date">{formatDate(contribution.date)}</div>
      <div className="entry__body">
        <h3 className="entry__title">{contribution.title}</h3>
        <p className="entry__desc">{contribution.description}</p>
        <div className="entry__tags">
          {team ? <Badge color={team.color}>{team.name}</Badge> : null}
          {member ? (
            <Link to={'/members/' + member.id}>
              <Badge neutral>{member.name}</Badge>
            </Link>
          ) : null}
          {contribution.tags?.map((tag) => (
            <Badge key={tag} neutral>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
