'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { phoneIncludes } from '@/lib/phone';

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
  // OrdersTable keeps its own copy of `orders` in state so edits/deletes can
  // update the list instantly without a round trip. That local copy is only
  // ever seeded from props on first mount, though -- when a sibling
  // component (AddOrderForm) adds a new order and calls router.refresh(),
  // this component re-renders with a fresh `orders` prop but its own `rows`
  // state doesn't pick that up on its own, so a newly-added order silently
  // didn't appear until a manual page reload. Syncing whenever the prop
  // reference changes fixes that.
  useEffect(() => {
    setRows(orders);
  }, [orders]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { buyerName: string; buyerEmail: string; buyerPhone: string; tableAssignment: string; seatNotes: string; status: string; paymentMethod: string; checkedIn: boolean }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');

  const visibleRows = search.trim()
    ? rows.filter((o) => {
        const q = search.trim().toLowerCase();
        return o.buyerName.toLowerCase().includes(q)
          || (o.buyerEmail ?? '').toLowerCase().includes(q)
          || phoneIncludes(o.buyerPhone, search);
      })
    : rows;

  const toggleExpand = (order: Order) => {
    if (expandedId === order.id) {
      setExpandedId(null);
      return;
    }
    setDrafts((prev) => ({
      ...prev,
      [order.id]: {
        buyerName: order.buyerName,
        buyerEmail: order.buyerEmail ?? '',
        buyerPhone: order.buyerPhone ?? '',
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

      setRows((prev) => prev.map((r) => (r.id === id ? {
        ...r,
        ...draft,
        buyerEmail: draft.buyerEmail || null,
        buyerPhone: draft.buyerPhone || null,
        tableAssignment: draft.tableAssignment || null,
        seatNotes: draft.seatNotes || null,
      } : r)));
      setExpandedId(null);
      router.refresh();
    } catch (err) {
      setErrors((prev) => ({ ...prev, [id]: err instanceof Error ? err.message : 'Failed to save.' }));
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string, buyerName: string) => {
    if (!window.confirm(`Delete the order for "${buyerName}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/tickets/orders/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to delete.');
      setRows((prev) => prev.filter((r) => r.id !== id));
      setExpandedId(null);
      router.refresh();
    } catch (err) {
      setErrors((prev) => ({ ...prev, [id]: err instanceof Error ? err.message : 'Failed to delete.' }));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="form-group" style={{ maxWidth: '320px' }}>
        <input
          type="text"
          placeholder="Search by name, email, or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {rows.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>No ticket orders yet — every real Zeffy ticket sale shows up here automatically, or use &quot;+ Add Order&quot; above for a cash/door commitment.</p>
      ) : visibleRows.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>No orders match &quot;{search}&quot;.</p>
      ) : (
      <div style={{ overflowX: 'auto' }}>
      {/* See MessagesTable: width:100% alone would squash the columns on
          mobile rather than letting the wrapper scroll. Nine columns
          here, so this is the widest of the four. */}
      <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse' }}>
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
          {visibleRows.map((o) => {
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
                    <button
                      onClick={() => toggleExpand(o)}
                      className={expandedId === o.id || o.tableAssignment ? 'btn btn-outline' : 'btn btn-primary'}
                      style={{ padding: '6px 16px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                    >
                      {expandedId === o.id ? 'Close' : o.tableAssignment ? 'Edit' : 'Assign Table'}
                    </button>
                  </td>
                </tr>
                {expandedId === o.id && draft && (
                  <tr style={borderRowStyle}>
                    <td colSpan={9} style={{ padding: '4px 8px 20px', background: 'rgba(201,168,76,0.04)' }}>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', maxWidth: '760px' }}>
                        <div className="form-group" style={{ flex: '1 1 200px' }}>
                          <label>Buyer Name</label>
                          <input
                            value={draft.buyerName}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], buyerName: e.target.value } }))}
                          />
                        </div>
                        <div className="form-group" style={{ flex: '1 1 200px' }}>
                          <label>Email</label>
                          <input
                            type="email"
                            value={draft.buyerEmail}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], buyerEmail: e.target.value } }))}
                          />
                        </div>
                        <div className="form-group" style={{ flex: '1 1 160px' }}>
                          <label>Phone</label>
                          <input
                            value={draft.buyerPhone}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], buyerPhone: e.target.value } }))}
                          />
                        </div>
                        <div className="form-group" style={{ flex: '1 1 260px' }}>
                          <label>Table Assignment ({o.totalSeats} seat{o.totalSeats === 1 ? '' : 's'} total)</label>
                          <input
                            placeholder="e.g. Table 4 — or Tables 4 & 5 if it doesn't fit at one"
                            value={draft.tableAssignment}
                            onChange={(e) => setDrafts((p) => ({ ...p, [o.id]: { ...p[o.id], tableAssignment: e.target.value } }))}
                          />
                          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                            All {o.totalSeats} seat{o.totalSeats === 1 ? '' : 's'} from this order go wherever you type here.
                            If they don&apos;t fit at one physical table, just list more than one, e.g. &quot;Tables 4 &amp; 5.&quot;
                          </p>
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
                        <button
                          onClick={() => handleDelete(o.id, o.buyerName)}
                          disabled={deletingId === o.id}
                          className="btn btn-outline"
                          style={{ padding: '8px 20px', fontSize: '0.85rem', marginLeft: 'auto', color: '#E86A6A', borderColor: 'rgba(232,106,106,0.4)' }}
                        >
                          {deletingId === o.id ? 'Deleting…' : 'Delete Order'}
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
      )}
    </div>
  );
}
