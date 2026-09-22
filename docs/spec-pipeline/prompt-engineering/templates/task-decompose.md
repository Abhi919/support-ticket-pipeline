# Template: Task decomposition (Agent 2 — plan phase)

**Variables:** `{{TICKET_ID}}`, `{{SPEC_REVISION}}`

## Prompt

Decompose approved spec for **{{TICKET_ID}}** (spec revision {{SPEC_REVISION}}) into atomic tasks.

**Read:** `specs/{{TICKET_ID}}/requirements.md`, `api-contract.md`, `state-machine.md` (and other non-N/A spec files).

**Produce:**

1. `specs/{{TICKET_ID}}/tasks.md` using `docs/spec-pipeline/templates/tasks.template.md`
2. Optional JSON at `specs/{{TICKET_ID}}/tasks.json` validating against `docs/spec-pipeline/prompt-engineering/schemas/task-list.schema.json`

**Rules:**

- IDs `T-001`, `T-002`, …
- Each task maps to ≥1 `AC-###`
- Each task has concrete verification (test name or command)
- Max ~1 day of work per task; split if larger

**Few-shot — good task row:**

| T-005 | Add `TicketStatusTransitionService` rejecting CLOSED→OPEN | AC-009 | `StateMachineIntegrationTest` | pending |

**Few-shot — bad task row:**

| T-005 | Build backend | AC-001..AC-010 | manual test | pending |

**Chain next:** Implement **one** task at a time using `templates/task-execute.md`.
