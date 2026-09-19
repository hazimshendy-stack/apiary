import { messages } from '@/data/messages';
import { PageHeader } from '@/components/ui/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/format';

export function MessagesPage() {
  const sorted = [...messages].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="container">
      <PageHeader
        eyebrow="The hive"
        title="Messages"
        description="Notes and updates from the people leading Season 7."
      />

      <section className="section">
        {sorted.length === 0 ? (
          <EmptyState message="No messages published yet." />
        ) : (
          <div className="stack">
            {sorted.map((message) => (
              <article key={message.id} className="card" style={{ padding: '28px' }}>
                <div className="row">
                  <Avatar name={message.from} size={46} />
                  <div>
                    <div className="card__title">{message.from}</div>
                    <div className="card__meta">{message.role}</div>
                  </div>
                  <span className="card__meta" style={{ marginInlineStart: 'auto' }}>
                    {formatDate(message.date)}
                  </span>
                </div>
                <h3 className="mt-5">{message.title}</h3>
                <p className="card__body">{message.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
