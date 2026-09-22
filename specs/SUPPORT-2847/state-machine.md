# State machine — SUPPORT-2847

## States

`OPEN` · `IN_PROGRESS` · `RESOLVED` · `CLOSED` · `CANCELLED`

## Allowed transitions

```
OPEN ──► IN_PROGRESS ──► RESOLVED ──► CLOSED
  │            │
  └─► CANCELLED ◄┘
```

| From | To |
|------|-----|
| OPEN | IN_PROGRESS, CANCELLED |
| IN_PROGRESS | RESOLVED, CANCELLED |
| RESOLVED | CLOSED |
| CLOSED | — |
| CANCELLED | — |

## Rejected examples

| From | To | HTTP |
|------|-----|------|
| CLOSED | OPEN | 409 Conflict |
| RESOLVED | OPEN | 409 Conflict |
| CANCELLED | IN_PROGRESS | 409 Conflict |
| OPEN | CLOSED | 409 Conflict |

## Implementation

`TicketStateMachine` in `support-ticket-service` — single source of truth. Status changes only via `PUT /api/tickets/{id}/status`.
