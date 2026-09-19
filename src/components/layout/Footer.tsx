import { Link } from 'react-router-dom';
import { site, activeSeason } from '@/data';
import { getOrgStats } from '@/lib/derive';

export function Footer() {
  const stats = getOrgStats();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="brand" style={{ marginBottom: '12px' }}>
            <span className="brand__mark" aria-hidden="true">A</span>
            <span>{site.name}</span>
          </div>
          <p className="footer__note">
            {site.organization} — {activeSeason.label}. {stats.members} members,
            {' '}{stats.teams} teams, {stats.contributions} contributions.
          </p>
        </div>

        <div className="footer__links">
          {site.social.map((item) => (
            <a
              key={item.label}
              className="footer__link"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          ))}
          <Link className="footer__link" to="/about">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
