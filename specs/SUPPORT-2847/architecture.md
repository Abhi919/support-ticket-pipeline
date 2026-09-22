# Architecture — SUPPORT-2847

## Overview

Two deployable units:

| Module | Role |
|--------|------|
| `support-ticket-service` | Spring Boot REST API + JPA + H2/PostgreSQL |
| `support-ticket-ui` | React SPA (Vite), proxies `/api` in dev |

## Layers (backend)

```
TicketController → TicketService → TicketRepository / TicketStateMachine
                                → Ticket, Comment entities
```

## Cross-cutting

- Jakarta Validation on request DTOs
- `GlobalExceptionHandler` → consistent `ProblemDetail` JSON
- CORS for `localhost:5173` and `localhost:3000`

## Persistence

Dev: H2 file at `./data/tickets`. Prod: PostgreSQL via Spring profile.
