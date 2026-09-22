import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  addComment,
  changeStatus,
  getTicket,
  updateTicket,
} from '../api/client';
import { ErrorBanner } from '../components/ErrorBanner';
import { StatusBadge } from '../components/StatusBadge';
import type { Priority, Ticket, TicketStatus } from '../types';
import { ALLOWED_TRANSITIONS, ALL_PRIORITIES } from '../types';

const STATUS_ACTION_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'Start Progress',
  RESOLVED: 'Resolve',
  CLOSED: 'Close',
  CANCELLED: 'Cancel',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString();
}

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const ticketId = Number(id);

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [assignee, setAssignee] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadTicket = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTicket(ticketId);
      setTicket(data);
      setTitle(data.title);
      setDescription(data.description);
      setPriority(data.priority);
      setAssignee(data.assignee ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ticket');
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    if (!Number.isFinite(ticketId)) {
      setError('Invalid ticket ID');
      setLoading(false);
      return;
    }
    loadTicket();
  }, [ticketId, loadTicket]);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updated = await updateTicket(ticketId, {
        title,
        description,
        priority,
        assignee: assignee.trim() || undefined,
      });
      setTicket(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save ticket');
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(nextStatus: TicketStatus) {
    setStatusChanging(true);
    setError('');
    try {
      const updated = await changeStatus(ticketId, nextStatus);
      setTicket(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status change failed');
    } finally {
      setStatusChanging(false);
    }
  }

  async function handleAddComment(e: FormEvent) {
    e.preventDefault();
    setCommentSubmitting(true);
    setError('');
    try {
      const updated = await addComment(ticketId, {
        author: commentAuthor,
        body: commentBody,
      });
      setTicket(updated);
      setCommentBody('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
    } finally {
      setCommentSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="page">
        <p className="muted">Loading…</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="page">
        <ErrorBanner message={error || 'Ticket not found'} />
        <Link to="/" className="btn btn-secondary">Back to list</Link>
      </div>
    );
  }

  const allowedTransitions = ALLOWED_TRANSITIONS[ticket.status];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Ticket #{ticket.id}</h1>
          <StatusBadge status={ticket.status} />
        </div>
        <Link to="/" className="btn btn-secondary">Back to list</Link>
      </header>

      <ErrorBanner message={error} onDismiss={() => setError('')} />

      {allowedTransitions.length > 0 && (
        <section className="card">
          <h2>Status Actions</h2>
          <div className="status-actions">
            {allowedTransitions.map((next) => (
              <button
                key={next}
                type="button"
                className="btn btn-outline"
                disabled={statusChanging}
                onClick={() => handleStatusChange(next)}
              >
                {STATUS_ACTION_LABELS[next]}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="card">
        <h2>Edit Ticket</h2>
        <form className="form" onSubmit={handleSave}>
          <label className="field">
            <span className="field-label">Title</span>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Description</span>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={4000}
              rows={6}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Priority</span>
            <select
              className="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              {ALL_PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field-label">Assignee</span>
            <input
              className="input"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              maxLength={120}
              placeholder="Optional"
            />
          </label>

          <div className="form-meta muted">
            Created {formatDate(ticket.createdAt)} · Updated {formatDate(ticket.updatedAt)}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Comments</h2>
        {ticket.comments && ticket.comments.length > 0 ? (
          <ul className="comment-list">
            {ticket.comments.map((c) => (
              <li key={c.id} className="comment">
                <div className="comment-header">
                  <strong>{c.author}</strong>
                  <span className="muted">{formatDate(c.createdAt)}</span>
                </div>
                <p className="comment-body">{c.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No comments yet.</p>
        )}

        <form className="form comment-form" onSubmit={handleAddComment}>
          <label className="field">
            <span className="field-label">Author *</span>
            <input
              className="input"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              maxLength={120}
              required
            />
          </label>
          <label className="field">
            <span className="field-label">Comment *</span>
            <textarea
              className="textarea"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              maxLength={4000}
              rows={3}
              required
            />
          </label>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={commentSubmitting}
            >
              {commentSubmitting ? 'Posting…' : 'Add Comment'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
