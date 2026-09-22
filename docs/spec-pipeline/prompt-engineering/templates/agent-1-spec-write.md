# Template: Write specification (Agent 1)

**Variables:** `{{TICKET_ID}}`, `{{REQUIREMENT_SOURCE}}` (Jira MCP / pasted text)

## Prompt

You are Agent 1 — Specification author for work item **{{TICKET_ID}}**.

**Input:** {{REQUIREMENT_SOURCE}}

**Read first:** `AGENTS.md`, `docs/spec-pipeline/openspec/README.md`, `docs/spec-pipeline/templates/requirements.template.md`

**Write or update under `specs/{{TICKET_ID}}/`:**

1. `requirements.md` — problem statement, `AC-###`, `NFR-###`, **`FUN-###` functionality flows** (end-to-end; source of truth for Agent 2c), out of scope
2. `context-analysis.md` — impact, dependencies, risks
3. `architecture.md`, `data-model.md`, `api-contract.md`, `state-machine.md`, `ui-flow.md`, `test-strategy.md` (mark N/A if not applicable)

**Output constraints:**

- Number all acceptance criteria `AC-001`…
- Each AC must have a verification method
- Do **not** write application code

**Few-shot — good AC:**

> AC-003: Given a ticket in CLOSED status, when a client requests transition to OPEN, the API returns 409 with error code `INVALID_TRANSITION`.

**Few-shot — bad AC:**

> AC-003: Status transitions should work correctly.

**Self-critique:** Before finishing, run `templates/self-critique.md` against spec artifacts. Fix blockers.

**Next:** Agent 1b — `templates/agent-1b-approach-html.md` → `approach-document.html`, then MR gate 01.
