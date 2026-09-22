# OpenSpec — specification mechanics (pipeline + Fission-AI CLI)

> **Integrated:** `openspec/` at repo root · `npm run openspec:init` · `../integrations/README.md`  
> **Bridge:** `scripts/openspec-bridge.sh` (auto on `spec-bootstrap.sh`)

## Writing a specification (Agent 1)

Every work item under `specs/<ID>/` must produce **spec artifacts before code**. Use `../templates/requirements.template.md`.

### Required sections in `requirements.md`

1. **Problem statement**
2. **Acceptance criteria** — `AC-###`
3. **Functionality flows** — `FUN-###` (Agent 2c source of truth)
4. **Non-functional constraints** — `NFR-###`
5. **Out of scope**

### Companion spec files (Agent 1)

| File | Purpose |
|------|---------|
| `architecture.md` | Components, boundaries |
| `data-model.md` | Entities, persistence |
| `api-contract.md` | REST contract |
| `state-machine.md` | Transitions (or N/A) |
| `ui-flow.md` | UX (or N/A) |
| `test-strategy.md` | Test approach |
| `context-analysis.md` | Risks, dependencies |

OpenSpec **delta specs** live under `openspec/changes/<slug>/specs/` with ADDED/MODIFIED/REMOVED sections.

## Task decomposition (Agent 2)

`../templates/tasks.template.md` — atomic `T-###` linked to `AC-###`.

## Traceability & drift

- `traceability.md`
- `spec-drift.md` → `spec-diff.md` in work item folder

## OpenSpec CLI workflow (same pipeline)

| Step | Action |
|------|--------|
| Init | `npm run openspec:init` |
| Bootstrap | `spec-bootstrap.sh` → bridge creates `openspec/changes/<slug>/` |
| Propose | `/opsx-propose` or Agent 1 |
| Apply | `/opsx-apply` or Agent 2 |
| Sync | `/opsx-sync` |
| Archive | `/opsx-archive` → `openspec/specs/` |
