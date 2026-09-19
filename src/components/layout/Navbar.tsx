import { NavLink } from 'react-router-dom';
import { site, activeSeason } from '@/data';
import { cx } from '@/lib/format';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/members', label: 'Members' },
  { to: '/teams', label: 'Teams' },
  { to: '/league', label: 'League' },
  { to: '/contributions', label: 'Contributions' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/messages', label: 'Messages' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  return (
    <header className="navbar">
      <nav className="container navbar__inner" aria-label="Main navigation">
        <NavLink to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">A</span>
          <span>
            {site.name}
            <span className="brand__sub" style={{ display: 'block' }}>
              {activeSeason.label}
            </span>
          </span>
        </NavLink>

        <div className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => cx('nav-link', isActive && 'is-active')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
