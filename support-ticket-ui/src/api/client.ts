import type {
  AddCommentRequest,
  CreateTicketRequest,
  ProblemDetail,
  Ticket,
  TicketStatus,
  UpdateTicketRequest,
} from '../types';

const BASE = '/api/tickets';

export class ApiError extends Error {
  readonly status: number;
  readonly problem: ProblemDetail;

  constructor(status: number, problem: ProblemDetail) {
    super(formatProblemMessage(problem));
    this.name = 'ApiError';
    this.status = status;
    this.problem = problem;
  }
}

export function formatProblemMessage(problem: ProblemDetail): string {
  const parts: string[] = [];

  if (problem.message) {
    parts.push(problem.message);
  }

  if (problem.fieldErrors) {
    for (const [field, msg] of Object.entries(problem.fieldErrors)) {
      parts.push(`${field}: ${msg}`);
    }
  }

  if (parts.length === 0 && problem.error) {
    parts.push(problem.error);
  }

  return parts.join(' — ') || 'An unexpected error occurred';
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    if (response.status === 204) {
      return undefined as T;
    }
    return response.json() as Promise<T>;
  }

  let problem: ProblemDetail;
  try {
    problem = (await response.json()) as ProblemDetail;
  } catch {
    problem = {
      timestamp: new Date().toISOString(),
      status: response.status,
      error: response.statusText,
      message: response.statusText || 'Request failed',
      path: '',
    };
  }

  throw new ApiError(response.status, problem);
}

export async function listTickets(params?: {
  q?: string;
  status?: TicketStatus;
}): Promise<Ticket[]> {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.status) search.set('status', params.status);

  const qs = search.toString();
  const url = qs ? `${BASE}?${qs}` : BASE;
  return handleResponse<Ticket[]>(await fetch(url));
}

export async function getTicket(id: number): Promise<Ticket> {
  return handleResponse<Ticket>(await fetch(`${BASE}/${id}`));
}

export async function createTicket(body: CreateTicketRequest): Promise<Ticket> {
  return handleResponse<Ticket>(
    await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  );
}

export async function updateTicket(
  id: number,
  body: UpdateTicketRequest,
): Promise<Ticket> {
  return handleResponse<Ticket>(
    await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  );
}

export async function changeStatus(
  id: number,
  status: TicketStatus,
): Promise<Ticket> {
  return handleResponse<Ticket>(
    await fetch(`${BASE}/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }),
  );
}

export async function addComment(
  id: number,
  body: AddCommentRequest,
): Promise<Ticket> {
  return handleResponse<Ticket>(
    await fetch(`${BASE}/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  );
}
