# Support Ticket Service

REST API for internal support ticket tracking (SUPPORT-2847).

## Requirements

- Java 21
- Maven 3.9+

## Run

```bash
cd support-ticket-service
mvn spring-boot:run
```

API base path: `http://localhost:8080/api/tickets`

H2 file database: `./data/tickets` (persists across restarts).

## Test

```bash
mvn test
```

Tests use in-memory H2 (`src/test/resources/application.properties`).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/tickets` | Create ticket |
| GET | `/api/tickets` | List (`?status=`, `?q=`) |
| GET | `/api/tickets/{id}` | Get ticket with comments |
| PUT | `/api/tickets/{id}` | Update fields (not status) |
| PUT | `/api/tickets/{id}/status` | Status transition |
| POST | `/api/tickets/{id}/comments` | Add comment |

Status changes are enforced by `TicketStateMachine`. Invalid transitions return HTTP 409.
