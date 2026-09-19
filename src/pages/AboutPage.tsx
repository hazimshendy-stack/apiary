import { site } from '@/data';

export function AboutPage() {
  return (
    <div className="container section">
      <div className="section-head__eyebrow">About</div>
      <h1>{site.name}</h1>
      <p className="hero__desc" style={{ marginTop: '16px' }}>
        {site.description}
      </p>

      <div className="card mt-6">
        <div className="kv">
          <span className="kv__k">Organization</span>
          <span className="kv__v">{site.organization}</span>
        </div>
        <div className="kv mt-4">
          <span className="kv__k">Season</span>
          <span className="kv__v">{site.season}</span>
        </div>
        <div className="kv mt-4">
          <span className="kv__k">Email</span>
          <a className="kv__v" href={'mailto:' + site.email}>
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
