'use client';

import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  tierId: string;
  tierNameEn: string;
  buyerName: string;
  buyerEmail: string | null;
  buyerPhone: string | null;
  quantity: number;
  totalSeats: number;
  amountCents: number;
  paymentMethod: string;
  status: string;
  tableAssignment: string | null;
  seatNotes: string | null;
  checkedIn: boolean;
  createdAt: string | Date;
}

const cellStyle: React.CSSProperties = { padding: '12px 8px' };
const borderRowStyle: React.CSSProperties = { borderBottom: '1px solid rgba(255,255,255,0.06)', verticalAlign: 'top' };

const PAYMENT_LABELS: Record<string, string> = { cash_door: 'Cash / Door', zeffy: 'Zeffy', comp: 'Comp' };
const STATUS_LABELS: Record<string, string> = { confirmed: 'Confirmed', paid: 'Paid', cancelled: 'Cancelled' };

function formatMoney(cents: number) {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(orders);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { tableAssignment: string; seatNotes: string; status: string; paymentMethod: string; checkedIn: boolean }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleExpand = (order: Order) => {
    if (expandedId === order.id) {
      setExpandedId(null);
      return;
    }
    setDrafts((prev) => ({
      ...prev,
      [order.id]: {
        tableAssignment: order.tableAssignment ?? '',
        seatNotes: order.seatNotes ?? '',
        status: order.status,
        paymentMethod: order.paymentMethod,
        checkedIn: order.checkedIn,
      },
    }));
    setExpandedId(order.id);
  };

  const handleSave = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    setSavingId(id);
    setErrors((prev) => ({ ...prev, [id]: '' }));

    try {
      const res = await fetch(`/api/admin/tickets/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to save.');

      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...draft, tableAssignment: draft.tableAssignment || null, seatNotes: draft.seatNotes || null } : r)));
      setExpandedId(null);
      router.refresh();
    } catch (err) {
      setErrors((prev) => ({ ...prev, [id]: err instanceof Error ? err.message : 'Failed to save.' }));
    } finally {
      setSavingId(null);
    }
  };

  if (rows.length === 0) {
    return <p style={{ color: 'rgba(255,255,255,0.7)' }}>No ticket orders yet — use &quot;+ Add Order&quot; above for a cash/door commitment or a reconciled Zeffy sale.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
            <th style={cellStyle}>Buyer</th>
            <th style={cellStyle}>Tier</th>
            <th style={cellStyle}>Seats</th>
            <th style={cellStyle}>Amount</th>
            <th style={cellStyle}>Payment</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Table</th>
            <th style={cellStyle}>Checked In</th>
            <th style={cellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => {
            const draft = drafts[o.id];
            return (
              <Fragment key={o.id}>
                <tr style={borderRowStyle}>
                  <td style={cellStyle}>
                    <div>{o.buyerName}</div>
                    {o.buyerEmail && <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{o.buyerEmail}</div>}
                    {o.buyerPhone && <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{o.buyerPhone}</div>}
                  </td>
                  <td style={cellStyle}>{o.tierNameEn} {o.quantity > 1 ? `×${o.quantity}` : ''}</td>
                  <td style={cellStyle}>{o.totalSeats}</td>
                  <td style={cellStyle}>{formatMoney(o.amountCents)}</td>
                  <td style={cellStyle}>{PAYMENT_LABELS[o.paymentMethod] ?? o.paymentMethod}</td>
                  <td style={cellStyle}>{STATUS_LABELS[o.status] ?? o.status}</td>
                  <td style={cellStyle}>{o.tableAssignment ?? '—'}</td>
                  <td style={cellStyle}>{o.checkedIn ? '✓' : '—'}</td>
                  <td style={cellStyle}>
                    <button onClick={() => toggleExpand(o)} className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                      {expandedId === o.id ? 'Close' : 'Manage'}
                    </button>
                  </td>
                </tr>
                {expandedId === o.id && draft && (
                  <tr style={borderRowStyle}>
                    <td colSpan={9} style={{ padding: '4px 8px 20px', background: 'rgba(201,168,76,0.04)' }}>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', maxWidth: '760px' }}>
                        <div className="form-group" style={{ flex: '1 1 200px' }}>
                          <label>Table Assignment</label>
                          <input
                            placeholder="e.g. Table 4"
                            value={draft.tableAssignment}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], tableAssignment: e.target.value } }))}
                          />
                        </div>
                        <div className="form-group" style={{ flex: '1 1 160px' }}>
                          <label>Status</label>
                          <select
                            value={draft.status}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], status: e.target.value } }))}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div className="form-group" style={{ flex: '1 1 160px' }}>
                          <label>Payment Method</label>
                          <select
                            value={draft.paymentMethod}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], paymentMethod: e.target.value } }))}
                          >
                            <option value="cash_door">Cash / Door</option>
                            <option value="zeffy">Zeffy</option>
                            <option value="comp">Comp</option>
                          </select>
                        </div>
                        <div className="form-group" style={{ flex: '1 1 100%' }}>
                          <label>Seat Notes</label>
                          <textarea
                            placeholder="e.g. seated with the Rodriguez table, vegetarian meal"
                            value={draft.seatNotes}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], seatNotes: e.target.value } }))}
                          />
                        </div>
                        <div className="form-group" style={{ flex: '1 1 100%' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={draft.checkedIn}
                              onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], checkedIn: e.target.checked } }))}
                            />
                            Checked in at the door
                          </label>
                        </div>
                      </div>
                      {errors[o.id] && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '8px' }}>{errors[o.id]}</p>}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button onClick={() => handleSave(o.id)} disabled={savingId === o.id} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem', opacity: savingId === o.id ? 0.7 : 1 }}>
                          {savingId === o.id ? 'Saving…' : 'Save'}
                        </button>
                        <button onClick={() => setExpandedId(null)} className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
