# Implementation notes — SUPPORT-2847

Agent 2 — one task per pipeline turn. See `tasks.md`.

---

## T-001 — Spring Boot scaffold + H2 file config

**Files:** `support-ticket-service/pom.xml`, `SupportTicketApplication.java`, `application.properties`, `.gitignore`

**Decision:** Java 21, Spring Boot 3.3.5, H2 file URL `jdbc:h2:file:./data/tickets` for restart persistence.

---

## T-002 — Entities + repositories

**Files:** `domain/Ticket.java`, `Comment.java`, `TicketStatus.java`, `Priority.java`, `TicketRepository.java`, `CommentRepository.java`

**Decision:** Search via JPQL on title/description; comments cascade from ticket.

---

## T-003 — State machine

**Files:** `service/TicketStateMachine.java`, `TicketStateMachineTest.java`, `InvalidStatusTransitionException.java`

**Decision:** Immutable transition map; same-status no-op allowed.

---

## T-004 — DTOs + errors + CORS

**Files:** `web/dto/*`, `GlobalExceptionHandler.java`, `WebConfig.java`

---

## T-005 — Service + CRUD controller

**Files:** `TicketService.java`, `TicketController.java` (create, list, get, update), `TicketControllerIntegrationTest.java`

---

## T-006 — Status + comments + integration tests

**Files:** status/comment controller methods, `TicketStateMachineIntegrationTest.java`

---

## T-007 — React scaffold

**Files:** `support-ticket-ui/package.json`, `vite.config.ts`, `src/api/client.ts`, `src/types.ts`

---

## T-008 — UI pages

**Files:** `App.tsx`, `TicketListPage`, `CreateTicketPage`, `TicketDetailPage`, `StatusBadge`, `styles.css`

---

## T-009 — Error UX + docs

**Files:** `ErrorBanner.tsx`, module READMEs.

**Verification (Agent 3):** `mvn test` — 12 tests, 0 failures (2026-09-13).
