# Design — SUPPORT-2847

**Status:** approved (Agent 1)  
**Spec revision:** 1

## Design decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| DD-001 | Separate status endpoint `PUT /tickets/{id}/status` | Keeps state machine enforcement in one code path |
| DD-002 | `TicketStateMachine` as `@Component` | Testable transition matrix independent of HTTP |
| DD-003 | H2 file store `./data/tickets` | Meets persistence AC without external DB for dev |
| DD-004 | React SPA + Vite proxy | Fast UI iteration; API remains framework-agnostic |
| DD-005 | `ProblemDetail` error JSON | Consistent validation (400) and conflict (409) responses |

## Component responsibilities

- **TicketController** — HTTP mapping, validation trigger
- **TicketService** — Transactions, orchestration
- **TicketStateMachine** — Allowed transitions only
- **TicketRepository** — Search/filter JPQL query

## Alternatives considered

| Option | Rejected because |
|--------|------------------|
| Status in generic PUT body | Easy to bypass lifecycle rules |
| Server-rendered Thymeleaf | Team preference for React SPA |
| In-memory H2 only | Fails persistence requirement |

## Traceability

Maps to `architecture.md`, `api-contract.md`, `state-machine.md`.
