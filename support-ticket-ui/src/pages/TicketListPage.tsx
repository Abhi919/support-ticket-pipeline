import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listTickets } from '../api/client';
import { ErrorBanner } from '../components/ErrorBanner';
import { StatusBadge } from '../components/StatusBadge';
import type { Ticket, TicketStatus } from '../types';
import { ALL_STATUSES } from '../types';

const DEBOUNCE_MS = 300;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString();
}

export function TicketListPage() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listTickets({
        q: debouncedSearch || undefined,
        status: statusFilter || undefined,
      });
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Support Tickets</h1>
        <Link to="/new" className="btn btn-primary">New Ticket</Link>
      </header>

      <ErrorBanner message={error} onDismiss={() => setError('')} />

      <div className="filters">
        <input
          type="search"
          className="input"
          placeholder="Search title or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search tickets"
        />
        <select
          className="select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TicketStatus | '')}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : tickets.length === 0 ? (
        <p className="muted">No tickets found.</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="ticket-row"
                onClick={() => navigate(`/tickets/${ticket.id}`)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/tickets/${ticket.id}`);
                  }
                }}
              >
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>
                  <span className={`priority priority-${ticket.priority.toLowerCase()}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td><StatusBadge status={ticket.status} /></td>
                <td>{ticket.assignee || '—'}</td>
                <td>{formatDate(ticket.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
