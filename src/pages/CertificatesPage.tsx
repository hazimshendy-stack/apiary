import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { certificates } from '@/data/certificates';
import { getMemberById } from '@/lib/derive';
import { PageHeader } from '@/components/ui/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Stat, StatRow } from '@/components/ui/Stat';
import { formatDate } from '@/lib/format';

export function CertificatesPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = certificates.filter((certificate) => {
      if (q.length === 0) return true;
      const member = getMemberById(certificate.memberId);
      return (
        certificate.title.toLowerCase().includes(q) ||
        certificate.issuer.toLowerCase().includes(q) ||
        (member ? member.name.toLowerCase().includes(q) : false)
      );
    });
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query]);

  const issuers = new Set(certificates.map((c) => c.issuer)).size;
  const holders = new Set(certificates.map((c) => c.memberId)).size;

  return (
    <div className="container">
      <PageHeader
        eyebrow="Credentials"
        title="Certificates"
        description="Verified certifications held by our members — issued by RSTC and external organizations."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={certificates.length} label="Certificates" />
          <Stat value={holders} label="Certified members" />
          <Stat value={issuers} label="Issuing bodies" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <input
          className="input"
          type="search"
          placeholder="Search certificates, issuers or members…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No certificates match your search." />
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Certificate</th>
                <th>Member</th>
                <th>Issuer</th>
                <th>Credential ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((certificate) => {
                const member = getMemberById(certificate.memberId);
                return (
                  <tr key={certificate.id}>
                    <td>{certificate.title}</td>
                    <td>
                      {member ? (
                        <Link to={'/members/' + member.id} className="row">
                          <Avatar name={member.name} size={30} />
                          <span>{member.name}</span>
                        </Link>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>
                    <td className="muted">{certificate.issuer}</td>
                    <td className="mono small muted">{certificate.credentialId ?? '—'}</td>
                    <td className="muted small nowrap">{formatDate(certificate.date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
