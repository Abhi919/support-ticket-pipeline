# Test cases — SUPPORT-2847

**Agent:** 3 — Testing  
**Linked spec:** `test-strategy.md`, `requirements.md` AC-###

| ID | Scenario | AC | Steps | Expected | Automated |
|----|----------|-----|-------|----------|-----------|
| TC-001 | Create valid ticket | AC-001 | POST `/api/tickets` with title, description, priority | 201, status OPEN | `TicketControllerIntegrationTest#createTicket` |
| TC-002 | Reject blank title | AC-009 | POST with blank title | 400, fieldErrors.title | `TicketControllerIntegrationTest#createTicket_blankTitle_returns400` |
| TC-003 | Lifecycle happy path | AC-007 | OPEN→IN_PROGRESS→RESOLVED→CLOSED | 200 each | `TicketStateMachineIntegrationTest#validLifecycle` |
| TC-004 | Reject CLOSED→OPEN | AC-008 | After CLOSED, PUT status OPEN | 409 | `TicketStateMachineIntegrationTest#closedToOpenRejected` |
| TC-005 | Cancel from OPEN | AC-007 | OPEN→CANCELLED | 200 | `TicketStateMachineIntegrationTest#cancelFromOpen` |
| TC-006 | Keyword search | AC-005 | GET `?q=printer` | Matching tickets | `TicketControllerIntegrationTest#searchByKeyword` |
| TC-007 | Status filter | AC-006 | GET `?status=OPEN` | Only OPEN | `TicketControllerIntegrationTest#filterByStatus` |
| TC-008 | Add comment | AC-004 | POST `/comments` | Comment in response | `TicketControllerIntegrationTest#addComment` |
| TC-009 | State machine unit matrix | AC-007, AC-008 | All illegal pairs | Exception thrown | `TicketStateMachineTest` (4 methods) |
| TC-010 | Persistence across restart | AC-011 | Create, restart JVM, GET list | Ticket present | Manual / H2 file |
| TC-011 | UI validation error display | AC-010 | Submit invalid create form | Error banner text | Manual smoke |

**Test run (2026-09-13):** `mvn test` — 12 tests, 0 failures.
