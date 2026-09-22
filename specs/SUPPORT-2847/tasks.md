# Implementation tasks — SUPPORT-2847

**Generated:** 2026-09-13  
**Spec revision:** 1

| ID | Description | AC / NFR | Verification | Status |
|----|-------------|----------|--------------|--------|
| T-001 | Spring Boot module scaffold + file-based H2 config | AC-011, NFR-001 | App starts; `./data/` created | done |
| T-002 | Ticket & Comment JPA entities + repositories | FUN-001 | Entities compile | done |
| T-003 | `TicketStateMachine` + unit tests | AC-007, AC-008, FUN-006, FUN-007 | `TicketStateMachineTest` | done |
| T-004 | Request DTOs, validation, `ProblemDetail`, CORS | AC-009, FUN-008 | 400 on blank title test | done |
| T-005 | `TicketService` + controller CRUD, list, search, filter | AC-001–006, FUN-001–005 | `TicketControllerIntegrationTest` | done |
| T-006 | Status endpoint + comments + state machine integration tests | AC-007, AC-008 | `TicketStateMachineIntegrationTest` | done |
| T-007 | React/Vite scaffold + typed API client | AC-001 | `npm run build` | done |
| T-008 | List, create, detail pages with search/filter/status UI | AC-001–006 | Manual smoke | done |
| T-009 | Error banner + module READMEs; full test run | AC-010 | `mvn test` all green | done |
