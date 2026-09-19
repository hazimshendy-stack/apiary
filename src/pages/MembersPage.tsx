import { useMemo, useState } from 'react';
import { members } from '@/data/members';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { MemberCard } from '@/components/member/MemberCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { cx } from '@/lib/format';

export function MembersPage() {
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState<TeamId | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesTeam = teamFilter === 'all' || member.teamIds.includes(teamFilter);
      const matchesQuery =
        q.length === 0 ||
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.arabicName.includes(query.trim());
      return matchesTeam && matchesQuery;
    });
  }, [query, teamFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="The hive"
        title="Members"
        description="Every member of Resala STEM Sub Branches, Season 7 — one profile, one source of truth, used across the entire platform."
      />

      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search by name or role…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="chips">
          <button
            type="button"
            className={cx('chip', teamFilter === 'all' && 'is-active')}
            onClick={() => setTeamFilter('all')}
          >
            All teams
          </button>
          {teams.map((team) => (
            <button
              key={team.id}
              type="button"
              className={cx('chip', teamFilter === team.id && 'is-active')}
              onClick={() => setTeamFilter(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No members match your search." />
      ) : (
        <div className="grid grid--wide">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
