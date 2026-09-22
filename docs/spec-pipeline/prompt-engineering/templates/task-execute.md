# Template: Execute single task (Agent 2 — implement phase)

**Variables:** `{{TICKET_ID}}`, `{{TASK_ID}}` (e.g. `T-003`)

## Prompt

Implement **only** task **{{TASK_ID}}** for `specs/{{TICKET_ID}}/`.

**Read:**

- Row for `{{TASK_ID}}` in `tasks.md`
- Linked AC sections in `requirements.md`
- Relevant sections of `api-contract.md` / `state-machine.md`
- `docs/spec-pipeline/steering/skill-routing.md` → matched skills

**Do:**

1. Implement minimal code change for this task
2. Add/update tests per verification column
3. Update `implementation-notes.md` (files touched, decisions)
4. Mark task `done` in `tasks.md`
5. Commit: `{{TASK_ID}}: <imperative summary>` with `Refs: AC-###` in body

**If spec is wrong:** stop; append `spec-diff.md` per `docs/spec-pipeline/openspec/spec-drift.md` — do not hack around stale spec silently.

**Do not** implement other `T-###` rows in this turn.
