import { useMemo, useState } from 'react';
import { contributions } from '@/data/contributions';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContributionEntry } from '@/components/shared/ContributionEntry';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stat, StatRow } from '@/components/ui/Stat';
import { getOrgStats } from '@/lib/derive';
import { cx } from '@/lib/format';

export function ContributionsPage() {
  const [teamFilter, setTeamFilter] = useState<TeamId | 'all'>('all');
  const stats = getOrgStats();

  const filtered = useMemo(() => {
    const list =
      teamFilter === 'all'
        ? contributions
        : contributions.filter((c) => c.teamId === teamFilter);
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [teamFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="Output"
        title="Contributions"
        description="Every recorded piece of work this season. Add an entry to src/data/contributions.ts and points recalculate everywhere."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.contributions} label="Total contributions" />
          <Stat value={stats.avgImpact + '%'} label="Average impact" />
          <Stat value={stats.teams} label="Contributing teams" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <div className="chips">
          <button
            type="button"
            className={cx('chip', teamFilter === 'all' && 'is-active')}
            onClick={() => setTeamFilter('all')}
          >
            All
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
        <EmptyState message="No contributions match this filter." />
      ) : (
        <div className="stack">
          {filtered.map((contribution) => (
            <ContributionEntry key={contribution.id} contribution={contribution} />
          ))}
        </div>
      )}
    </div>
  );
}
