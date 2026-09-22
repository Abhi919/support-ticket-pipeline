# AI mistakes log

Record incorrect AI suggestions before accepting fixes — keeps spec and code aligned.

| Date | Work item | Stage | AI suggestion (wrong) | Why wrong | Correct action | MR / commit |
|------|-----------|-------|----------------------|-----------|----------------|-------------|
| 2026-09-13 | SUPPORT-2847 | Design | Allow status change via generic PATCH on ticket body | Bypasses state machine; client could jump OPEN→CLOSED | Dedicated `PUT /api/tickets/{id}/status` calling `TicketStateMachine` | T-003, T-004 |
| 2026-09-13 | SUPPORT-2847 | Implement | Use in-memory H2 only (`jdbc:h2:mem`) | Fails AC-011 — data lost on restart | File-based H2 at `./data/tickets` | `application.properties` |

## Categories to watch

- Invented requirements not in spec
- Invalid state transitions marked as OK
- Skipping validation or security controls
- Scope creep beyond current `T-###` task
- Stale spec left unchanged after code drift
