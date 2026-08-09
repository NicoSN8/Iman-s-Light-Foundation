'use client';

import { useState, Fragment } from 'react';

interface Submission {
  id: string;
  createdAt: string | Date;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  lang: string;
  adminReply: string | null;
  repliedAt: string | Date | null;
}

const cellStyle: React.CSSProperties = { padding: '12px 8px' };
const borderRowStyle: React.CSSProperties = { borderBottom: '1px solid rgba(255,255,255,0.06)', verticalAlign: 'top' };

export default function MessagesTable({ submissions }: { submissions: Submission[] }) {
  const [rows, setRows] = useState(submissions);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  const handleSend = async (id: string) => {
    const reply = (drafts[id] || '').trim();
    if (!reply) return;
    setSendingId(id);
    setErrors((prev) => ({ ...prev, [id]: '' }));

    try {
      const res = await fetch(`/api/admin/messages/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to send reply.');

      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, adminReply: reply, repliedAt: data.repliedAt } : r)));
      setDrafts((prev) => ({ ...prev, [id]: '' }));
      setExpandedId(null);
    } catch (err) {
      setErrors((prev) => ({ ...prev, [id]: err instanceof Error ? err.message : 'Failed to send reply.' }));
    } finally {
      setSendingId(null);
    }
  };

  if (rows.length === 0) {
    return <p style={{ color: 'rgba(255,255,255,0.7)' }}>No messages yet.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Phone</th>
            <th style={cellStyle}>Subject</th>
            <th style={cellStyle}>Message</th>
            <th style={cellStyle}>Lang</th>
            <th style={cellStyle}>Reply</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <Fragment key={s.id}>
              <tr style={borderRowStyle}>
                <td style={{ ...cellStyle, whiteSpace: 'nowrap', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  {new Date(s.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td style={cellStyle}>{s.name}</td>
                <td style={cellStyle}>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </td>
                <td style={cellStyle}>{s.phone ?? '—'}</td>
                <td style={cellStyle}>{s.subject}</td>
                <td style={{ ...cellStyle, maxWidth: '360px' }}>{s.message}</td>
                <td style={{ ...cellStyle, textTransform: 'uppercase', fontSize: '0.8rem' }}>{s.lang}</td>
                <td style={cellStyle}>
                  {s.repliedAt ? (
                    <button
                      onClick={() => toggleExpand(s.id)}
                      style={{
                        background: 'rgba(52, 199, 89, 0.12)',
                        color: '#4ade80',
                        border: '1px solid rgba(52, 199, 89, 0.3)',
                        borderRadius: '20px',
                        padding: '5px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                      }}
                    >
                      ✓ Replied {new Date(s.repliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleExpand(s.id)}
                      className="btn btn-outline"
                      style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                    >
                      Reply
                    </button>
                  )}
                </td>
              </tr>
              {expandedId === s.id && (
                <tr key={`${s.id}-reply`} style={borderRowStyle}>
                  <td colSpan={8} style={{ padding: '4px 8px 20px', background: 'rgba(201,168,76,0.04)' }}>
                    {s.adminReply && (
                      <div style={{ marginBottom: '12px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                        <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Last reply sent:</strong>
                        <p style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>{s.adminReply}</p>
                      </div>
                    )}
                    <textarea
                      value={drafts[s.id] ?? ''}
                      onChange={(e) => setDrafts((prev) => ({ ...prev, [s.id]: e.target.value }))}
                      placeholder={`Reply to ${s.name}...`}
                      rows={4}
                      style={{
                        width: '100%',
                        maxWidth: '600px',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(10,14,26,0.6)',
                        color: '#fff',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        resize: 'vertical',
                      }}
                    />
                    {errors[s.id] && (
                      <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '8px' }}>{errors[s.id]}</p>
                    )}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button
                        onClick={() => handleSend(s.id)}
                        disabled={sendingId === s.id || !(drafts[s.id] || '').trim()}
                        className="btn btn-primary"
                        style={{ padding: '8px 20px', fontSize: '0.85rem', opacity: sendingId === s.id ? 0.7 : 1 }}
                      >
                        {sendingId === s.id ? 'Sending…' : 'Send Reply'}
                      </button>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="btn btn-outline"
                        style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
