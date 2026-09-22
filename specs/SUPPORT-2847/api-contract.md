# API contract — SUPPORT-2847

Base path: `/api/tickets`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/tickets` | Create ticket (201) |
| GET | `/api/tickets` | List; query `status`, `q` |
| GET | `/api/tickets/{id}` | Ticket with comments |
| PUT | `/api/tickets/{id}` | Update fields (not status) |
| PUT | `/api/tickets/{id}/status` | Status transition |
| POST | `/api/tickets/{id}/comments` | Add comment (201) |

## Create body

```json
{
  "title": "string (required, max 200)",
  "description": "string (required, max 4000)",
  "priority": "LOW | MEDIUM | HIGH | URGENT",
  "assignee": "string optional, max 120"
}
```

## Problem response

```json
{
  "timestamp": "ISO-8601",
  "status": 400,
  "error": "Validation Failed",
  "message": "One or more fields are invalid",
  "path": "/api/tickets",
  "fieldErrors": { "title": "must not be blank" }
}
```

Conflict on invalid transition: HTTP 409, `error`: `Invalid Status Transition`.
