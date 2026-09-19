import { useMemo, useState } from 'react';
import { achievements } from '@/data/achievements';
import type { AchievementLevel } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { AchievementEntry } from '@/components/shared/AchievementEntry';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stat, StatRow } from '@/components/ui/Stat';
import { getAchievementLevelCounts } from '@/lib/derive';
import { cx } from '@/lib/format';

const LEVELS: Array<AchievementLevel | 'all'> = ['all', 'branch', 'national', 'international'];

export function AchievementsPage() {
  const [levelFilter, setLevelFilter] = useState<AchievementLevel | 'all'>('all');
  const counts = getAchievementLevelCounts();

  const filtered = useMemo(() => {
    const list =
      levelFilter === 'all'
        ? achievements
        : achievements.filter((a) => a.level === levelFilter);
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [levelFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="Recognition"
        title="Achievements"
        description="Awards, certifications and milestones earned by the hive this season — at branch, national and international level."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={counts.branch} label="Branch level" />
          <Stat value={counts.national} label="National level" />
          <Stat value={counts.international} label="International level" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <div className="chips">
          {LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              className={cx('chip', levelFilter === level && 'is-active')}
              onClick={() => setLevelFilter(level)}
            >
              {level === 'all' ? 'All levels' : level}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No achievements match this filter." />
      ) : (
        <div className="stack">
          {filtered.map((achievement) => (
            <AchievementEntry key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}
    </div>
  );
}
