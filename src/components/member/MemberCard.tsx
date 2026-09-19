import { Link } from 'react-router-dom';
import type { Member } from '@/types';
import { getTeamById } from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export function MemberCard({ member }: { member: Member }) {
  return (
    <Link to={'/members/' + member.id} className="card member-card">
      <Avatar name={member.name} />
      <div className="member-card__body">
        <div className="member-card__name">{member.name}</div>
        <div className="member-card__role">{member.role}</div>
        <div className="member-card__teams">
          {member.teamIds.map((id) => {
            const team = getTeamById(id);
            if (!team) return null;
            return (
              <Badge key={id} color={team.color}>
                {team.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
