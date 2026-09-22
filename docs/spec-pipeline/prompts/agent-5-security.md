# Agent 5 — Security + fix loop (pipeline stage 5)

**Unified pipeline:** `docs/spec-pipeline/PIPELINE.md` · **Prior:** MR 04 approved · **Final:** `final-summary.md`

## Outputs

`security-audit.md`, `vulnerability-fixes.md`

## Fix loop

Security blockers → stage 2 → stage 3 → re-review as needed

## MR gate 05

Branch `spec/<TICKET>/stage-05-agent5` · `stages.agent5.status` = `approved`

Then: `final-summary.md`, `stages.final.status` = `ready_for_merge`

Self-critique: `templates/self-critique.md` (stage: agent5)

**Hook:** `security-audit.md` → final handoff hint (after MR 05).
