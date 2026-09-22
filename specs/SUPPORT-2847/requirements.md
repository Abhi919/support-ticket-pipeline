# Requirements — SUPPORT-2847

**Status:** approved  
**Spec revision:** 1  
**Last updated:** 2026-09-13

## Problem statement

Internal teams need a lightweight support ticket tracker: create issues, assign owners, discuss via comments, and move tickets through a defined lifecycle. Data must persist across restarts and invalid workflow jumps must be blocked server-side.

## Acceptance criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-001 | Create ticket from UI | Manual + API test |
| AC-002 | List and view tickets | UI + GET `/api/tickets` |
| AC-003 | Update title, description, priority, assignee | PUT `/api/tickets/{id}` |
| AC-004 | Add comments | POST `/api/tickets/{id}/comments` |
| AC-005 | Keyword search on title/description | GET `?q=` |
| AC-006 | Filter by status | GET `?status=` |
| AC-007 | Valid status transitions enforced | Integration tests |
| AC-008 | Invalid transitions return 409 | Integration tests |
| AC-009 | Backend validation with field errors | 400 responses |
| AC-010 | UI shows API error messages | Manual |
| AC-011 | Data survives restart | H2 file store |

## Functionality flows

| ID | Flow name | Description (trigger → steps → outcome) | Components | Done when |
|----|-----------|-------------------------------------------|------------|-----------|
| FUN-001 | Create ticket | User submits form → POST `/api/tickets` → ticket persisted as OPEN | UI, API, DB | Ticket appears in list |
| FUN-002 | List & search | User opens home → GET with optional `q` and `status` → rows rendered | UI, API, DB | Filters return expected subset |
| FUN-003 | View & edit ticket | User opens detail → GET by id → edits fields → PUT → refreshed view | UI, API | Fields saved |
| FUN-004 | Change assignee | User updates assignee on detail form → PUT includes assignee | UI, API | Assignee updated |
| FUN-005 | Add comment | User posts comment → POST comments → ticket returned with thread | UI, API | Comment visible on detail |
| FUN-006 | Status transition | User clicks allowed action → PUT `/status` → state machine validates → status updated | UI, API, StateMachine | Only legal transitions succeed |
| FUN-007 | Reject bad transition | Client or API sends illegal next status → 409 with message | API, StateMachine | CLOSED→OPEN etc. rejected |
| FUN-008 | Validation errors | Blank title etc. → 400 with `fieldErrors` → banner in UI | UI, API | User sees field-level message |

## Non-functional constraints

| ID | Constraint | Target / note |
|----|------------|---------------|
| NFR-001 | Runtime | Java 21, Spring Boot 3 |
| NFR-002 | Database | H2 file (dev), PostgreSQL optional |
| NFR-003 | API style | REST JSON under `/api/tickets` |
| NFR-004 | No secrets in repo | Env-based DB credentials |

## Out of scope

- Authentication / RBAC
- Email notifications
- File attachments

## Open questions

| ID | Question | Owner | Resolution |
|----|----------|-------|------------|
| Q-001 | Auth model for v2? | Product | Deferred |
