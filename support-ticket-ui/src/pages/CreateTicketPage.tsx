import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTicket } from '../api/client';
import { ErrorBanner } from '../components/ErrorBanner';
import type { Priority } from '../types';
import { ALL_PRIORITIES } from '../types';

export function CreateTicketPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [assignee, setAssignee] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const ticket = await createTicket({
        title,
        description,
        priority,
        assignee: assignee.trim() || undefined,
      });
      navigate(`/tickets/${ticket.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Create Ticket</h1>
        <Link to="/" className="btn btn-secondary">Back to list</Link>
      </header>

      <ErrorBanner message={error} onDismiss={() => setError('')} />

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field-label">Title *</span>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Description *</span>
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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}
