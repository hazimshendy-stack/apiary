import { site, activeSeason, seasons } from '@/data';
import { getBranchDistribution, getOrgStats, getAllTeamStats } from '@/lib/derive';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Stat, StatRow } from '@/components/ui/Stat';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';

export function AboutPage() {
  const stats = getOrgStats();
  const branchDistribution = getBranchDistribution();
  const teamStats = getAllTeamStats();
  const maxBranch = Math.max(1, ...branchDistribution.map((b) => b.count));

  return (
    <div className="container">
      <PageHeader
        eyebrow="About"
        title={site.name}
        description={site.description}
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.members} label="Members" />
          <Stat value={stats.teams} label="Sub-teams" />
          <Stat value={stats.branches} label="Branches" />
          <Stat value={stats.contributions} label="Contributions" />
          <Stat value={stats.achievements} label="Achievements" />
          <Stat value={stats.certificates} label="Certificates" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Current season"
          title={activeSeason.label}
          description={activeSeason.theme}
        />
        <div className="grid grid--wide">
          <div className="card">
            <div className="kv">
              <span className="kv__k">Season</span>
              <span className="kv__v">{activeSeason.label}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">Starts</span>
              <span className="kv__v">{formatDate(activeSeason.start)}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">Ends</span>
              <span className="kv__v">{formatDate(activeSeason.end)}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">Status</span>
              <span className="kv__v">
                <Badge color="#34D399" dot>
                  Active
                </Badge>
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card__title">Season history</div>
            <div className="stack stack--sm mt-4">
              {seasons.map((season) => (
                <div key={season.id} className="row" style={{ justifyContent: 'space-between' }}>
                  <span>{season.label}</span>
                  <span className="muted small">{season.theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Reach"
          title="Sub-branches"
          description="Where the hive operates this season."
        />
        <div className="grid grid--wide">
          {branchDistribution.map(({ branch, count }) => (
            <div key={branch.id} className="card">
              <div className="card__title">{branch.name}</div>
              <div className="card__meta">{branch.arabicName} · {branch.city}</div>
              <div className="row mt-4" style={{ justifyContent: 'space-between' }}>
                <span className="muted small">{count} members</span>
                <span className="muted small">Since {formatDate(branch.founded)}</span>
              </div>
              <div
                style={{
                  marginTop: 12,
                  height: 6,
                  borderRadius: 999,
                  background: 'var(--color-surface-3)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: Math.round((count / maxBranch) * 100) + '%',
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Structure"
          title="Team ranking"
          description="Computed from member performance across all teams."
        />
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Team</th>
                <th>Members</th>
                <th>Contributions</th>
                <th>Achievements</th>
                <th>Avg. impact</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teamStats.map((entry) => (
                <tr key={entry.team.id}>
                  <td>
                    <span className="row" style={{ gap: 8 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 3,
                          background: entry.team.color,
                        }}
                      />
                      {entry.team.name}
                    </span>
                  </td>
                  <td>{entry.memberCount}</td>
                  <td>{entry.contributionCount}</td>
                  <td>{entry.achievementCount}</td>
                  <td>{entry.avgImpact}%</td>
                  <td className="points">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Contact" title="Get in touch" />
        <div className="card">
          <div className="kv">
            <span className="kv__k">Email</span>
            <a className="kv__v" href={'mailto:' + site.email}>
              {site.email}
            </a>
          </div>
          <div className="row mt-4">
            {site.social.map((item) => (
              <a
                key={item.label}
                className="btn btn--ghost"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
