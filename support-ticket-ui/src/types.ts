export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED'
  | 'CANCELLED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Comment {
  id: number;
  author: string;
  body: string;
  createdAt: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: Priority;
  assignee?: string;
}

export interface UpdateTicketRequest {
  title: string;
  description: string;
  priority: Priority;
  assignee?: string;
}

export interface AddCommentRequest {
  author: string;
  body: string;
}

export interface ProblemDetail {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: Record<string, string>;
}

/** Allowed status transitions (mirrors backend state machine). */
export const ALLOWED_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  OPEN: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['RESOLVED', 'CANCELLED'],
  RESOLVED: ['CLOSED'],
  CLOSED: [],
  CANCELLED: [],
};

export const ALL_STATUSES: TicketStatus[] = [
  'OPEN',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
  'CANCELLED',
];

export const ALL_PRIORITIES: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
