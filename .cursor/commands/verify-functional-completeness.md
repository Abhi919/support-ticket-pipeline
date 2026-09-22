# Verify functional completeness (pipeline stage 2c)

Run **Agent 2c** before generating test cases.

## Steps

1. Open `specs/<TICKET>/requirements.md` → **Functionality flows** (`FUN-###`).
2. For each flow, trace trigger → persistence → async steps → external effects in **code** (not docs only).
3. Complete `functional-completeness-report.md` per `templates/functional-completeness-report.template.md`.
4. Set overall result:
   - **`pass`** → proceed to `.cursor/commands/generate-tests.md` (stage 3)
   - **`fail`** → add `T-###` tasks, return to `prompts/agent-2-implementation.md`; **do not** start test cases

## Steering

`docs/spec-pipeline/steering/functional-verification.md`

Record session in `docs/prompt-history.md`.
