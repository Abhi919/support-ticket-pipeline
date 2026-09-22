# Implementation tasks — {{TICKET_ID}}

**Generated:** {{ISO_DATE}}  
**Spec revision:** 1

Atomic, independently verifiable tasks. One commit (or small PR slice) per task where possible.

| ID | Description | AC / NFR | Verification | Status |
|----|-------------|----------|--------------|--------|
| T-001 | | AC-001 | `mvn test -Dtest=...` | pending |

## Status values

`pending` | `in_progress` | `done` | `blocked` | `cancelled`

## Example (good vs bad)

**Good:** `T-003` — Add validator rejecting `CLOSED → OPEN`; verify with `StateMachineTest#closedToOpenRejected`.  
**Bad:** `T-003` — Implement entire ticket management module.
