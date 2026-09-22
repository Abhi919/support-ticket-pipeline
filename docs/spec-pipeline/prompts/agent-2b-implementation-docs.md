# Agent 2b — Implementation documentation (pipeline stage 2b)

**Unified pipeline:** `docs/spec-pipeline/PIPELINE.md` · **After:** Agent 2 code complete · **Before:** Agent 2c

## Purpose

Document what was built: technical HTML for developers/ops, deployment details for release.

## Preconditions

- All `T-###` tasks in `tasks.md` marked `done` (or explicit exceptions noted)
- Code committed on feature branch

## Execute

Template: `prompt-engineering/templates/agent-2b-impl-docs.md`  
Steering: `steering/implementation-documentation.md`  
Templates: `technical-documentation.template.html`, `deployment-details.template.md`

## Outputs

| File | Description |
|------|-------------|
| `technical-documentation.html` | Services, collections, queues, schedulers, scripts, configs, FUN→code map |
| `deployment-details.md` | Services, **feature branch**, **parent branch**, deploy order, rollback |

## Inputs

- `implementation-notes.md`, `tasks.md`, `architecture.md`, `data-model.md`, `requirements.md` (FUN flows)
- Actual git branch names (`git branch --show-current`, parent from manifest or team convention)

## Handoff

→ **Agent 2c** functional completeness check.  
**Hook:** both docs present → run Agent 2c.
