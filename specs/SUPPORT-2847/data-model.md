# Data model — SUPPORT-2847

## tickets

| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK | Auto-increment |
| title | VARCHAR(200) | Not null |
| description | VARCHAR(4000) | Not null |
| priority | ENUM | LOW, MEDIUM, HIGH, URGENT |
| status | ENUM | Default OPEN |
| assignee | VARCHAR(120) | Nullable |
| created_at | TIMESTAMP | Set on insert |
| updated_at | TIMESTAMP | Set on insert/update |

## comments

| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK | |
| ticket_id | BIGINT FK | → tickets.id |
| author | VARCHAR(120) | Not null |
| body | VARCHAR(4000) | Not null |
| created_at | TIMESTAMP | Set on insert |

## Relationships

- Ticket 1 — * Comment (cascade persist, ordered by created_at ASC)
