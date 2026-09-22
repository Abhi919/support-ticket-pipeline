# Agent 1 — Specification (pipeline stage 1)

**Unified pipeline:** `docs/spec-pipeline/PIPELINE.md` · **Next:** Agent 1b → MR 01 → Agent 2

## Inputs

- `specs/<TICKET>/` from `scripts/spec-bootstrap.sh`
- Requirements: Jira MCP, pasted text, or product brief

## Execute with template

`docs/spec-pipeline/prompt-engineering/templates/agent-1-spec-write.md`

## Outputs (before Agent 1b)

`requirements.md` (**must include Functionality flows `FUN-###`**), `context-analysis.md`, `architecture.md`, `data-model.md`, `api-contract.md`, `state-machine.md`, `ui-flow.md`, `test-strategy.md`

## Handoff

→ **Agent 1b** (`prompts/agent-1b-stakeholder-approach.md`) → `approach-document.html`  
→ **MR gate 01** (spec + approach HTML) → Agent 2

No code in this stage.
