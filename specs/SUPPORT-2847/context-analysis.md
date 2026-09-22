# Context analysis — SUPPORT-2847

**Status:** approved (Agent 1)  
**Last updated:** 2026-09-13

## Work item summary

Internal support ticket tracker: CRUD tickets, comments, search/filter, lifecycle state machine, React UI + Spring Boot API.

## Impact

| Area | Impact |
|------|--------|
| New services | `support-ticket-service`, `support-ticket-ui` |
| Existing systems | None — standalone MVP |
| Data | New H2 file DB (dev); PostgreSQL optional later |

## Dependencies

- Java 21, Maven, Node 18+ for UI
- No external auth provider in v1
- Spec pipeline artifacts under `specs/SUPPORT-2847/`

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Invalid status transitions via API | Medium | Dedicated state machine component; 409 on illegal moves |
| Data loss on restart if using in-memory DB | High | File-based H2 in `application.properties` |
| Scope creep (auth, email) | Medium | Documented out of scope in requirements |

## Assumptions

- Single-tenant internal use; assignee is free-text email/name
- No concurrent edit conflict handling beyond last-write-wins

## Open items

None blocking specification.
