import { getAllTeamStats } from '@/lib/derive';
import { TeamCard } from '@/components/team/TeamCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatRow, Stat } from '@/components/ui/Stat';
import { getOrgStats } from '@/lib/derive';

export function TeamsPage() {
  const teamStats = getAllTeamStats();
  const orgStats = getOrgStats();

  return (
    <div className="container">
      <PageHeader
        eyebrow="Structure"
        title="Sub-teams"
        description="Seven specialized teams operating across five sub-branches. Each team has one owner, one domain and one measurable output."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={orgStats.teams} label="Sub-teams" />
          <Stat value={orgStats.members} label="Members" />
          <Stat value={orgStats.branches} label="Branches" />
          <Stat value={orgStats.contributions} label="Contributions" />
        </StatRow>
      </section>

      <section className="section">
        <div className="grid grid--wide">
          {teamStats.map((stats) => (
            <TeamCard key={stats.team.id} stats={stats} />
          ))}
        </div>
      </section>
    </div>
  );
}
