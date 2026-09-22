# Agent 4 — Review + fix loop (pipeline stage 4)

**Unified pipeline:** `docs/spec-pipeline/PIPELINE.md` · **Prior:** MR 03 approved · **Next after MR 04:** Agent 5

## Execute

`.cursor/commands/review-code.md` · Checklist: `steering/review-checklist.md` · Traceability: `openspec/traceability.md`

## Outputs

`review-report.md` (blocker / major / minor)

## Fix loop (same pipeline, return to stage 2)

Blockers → Agent 2 scoped `T-###` → Agent 3 re-test → resume stage 4

## MR gate 04

Branch `spec/<TICKET>/stage-04-agent4` · `stages.agent4.status` = `approved`

Log AI errors in `docs/ai-mistakes-log.md` if applicable.

**Hook:** `review-report.md` → handoff hint for stage 5 (after MR 04).
