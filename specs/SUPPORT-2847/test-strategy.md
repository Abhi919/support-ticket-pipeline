# Test strategy — SUPPORT-2847

## Backend

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | JUnit 5 | `TicketStateMachine` transition matrix |
| Integration | MockMvc + H2 mem | Full HTTP lifecycle, validation, 409 paths |
| Persistence | H2 file (manual) | Restart API, verify ticket still listed |

## Frontend

Manual smoke: create → list → search → edit → comment → status buttons.

## CI command

```bash
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
mvn -f support-ticket-service/pom.xml test
```
