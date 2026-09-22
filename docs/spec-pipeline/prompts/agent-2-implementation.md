# Agent 2 — Plan + implement (pipeline stage 2)

**Unified pipeline:** `PIPELINE.md` · **Prior:** MR 01 approved · **Next:** Agent 2b (not Agent 3)

## Phase A — Task decomposition

`prompt-engineering/templates/task-decompose.md` → `tasks.md`

## Phase B — Implementation

`task-execute.md` per `T-###` · Skills: `skill-routing.md`

## Outputs

`tasks.md`, code, `implementation-notes.md`, `spec-diff.md` if drift

## Handoff when all T-### done

→ **Agent 2b** (`prompts/agent-2b-implementation-docs.md`) — technical HTML + deployment MD  
→ **Agent 2c** — functional completeness (`FUN-###` from requirements)  
→ MR gate 02 only if 2c **pass** → then Agent 3

Do not skip 2b/2c or start test cases early.
