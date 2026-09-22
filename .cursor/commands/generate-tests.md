# Generate tests (pipeline stage 3)

Generate tests as part of the **unified pipeline** (`docs/spec-pipeline/PIPELINE.md`).

## Steps

1. Read `specs/<TICKET_ID>/test-strategy.md`, `requirements.md` (AC-###), `state-machine.md`, `api-contract.md`.
2. Read or create `test-cases.md` with `TC-###` rows linked to `AC-###`.
3. Generate **only** tests for the requested `T-###` or `AC-###` scope — not the entire suite unless asked.
4. Follow `.cursor/rules/testing.mdc` and `docs/spec-pipeline/steering/testing-standards.md`.
5. Run `mvn test` (or module path) and paste summary into `implementation-notes.md` or PR.

Record session in `docs/prompt-history.md`.
