# Review code (pipeline stage 4)

Review code as part of the **unified pipeline** (`docs/spec-pipeline/PIPELINE.md`).

## Steps

1. Identify `TICKET_ID` from branch name or `specs/` folder.
2. Read `specs/<TICKET_ID>/requirements.md`, `tasks.md`, and changed files (`git diff`).
3. Apply `.cursor/rules/java-springboot.mdc`, `testing.mdc`, `api-standards.mdc`.
4. Verify each completed `T-###` maps to `AC-###` and has tests per `tasks.md` verification column.
5. Output findings as blocker / major / minor; suggest fixes, do not rewrite everything unless asked.
6. Run self-critique template: `docs/spec-pipeline/prompt-engineering/templates/self-critique.md` (stage: agent4).

Record session in `docs/prompt-history.md`.
