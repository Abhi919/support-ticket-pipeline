# Agent 3 — Testing (pipeline stage 3)

**Unified pipeline:** `PIPELINE.md` · **Prior:** MR 02 approved **and** Agent 2c `pass`

## Preconditions (mandatory)

- `functional-completeness-report.md` → **Overall result: `pass`**
- If `fail`, return to Agent 2 — do not run this agent

## Execute

`.cursor/commands/generate-tests.md`

## Outputs

`test-cases.md` (`TC-###`), automated tests

## MR gate 03

Branch `spec/<TICKET>/stage-03-agent3` · `stages.agent3.status` = `approved`
