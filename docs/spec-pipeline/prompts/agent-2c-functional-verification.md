# Agent 2c — Functional completeness verifier (pipeline stage 2c)

**Unified pipeline:** `docs/spec-pipeline/PIPELINE.md` · **After:** Agent 2b · **Before:** Agent 3 (testing)

## Purpose

Verify **from a functional perspective** that all `FUN-###` flows in `requirements.md` are fully implemented in code — end-to-end, across services, DB, schedulers, queues, etc.

## Source of truth

`requirements.md` → **Functionality flows** section only (not AC table alone).

## Execute

Template: `prompt-engineering/templates/agent-2c-functional-check.md`  
Command: `.cursor/commands/verify-functional-completeness.md`  
Steering: `steering/functional-verification.md`  
Report template: `templates/functional-completeness-report.template.md`

## Method

For each `FUN-###`:

1. Break flow into verifiable steps (persist, poll, publish, consume, notify, …).
2. Search codebase for concrete evidence (classes, repos, listeners, `@Scheduled`, configs).
3. Mark step `present` | `partial` | `missing`.
4. Flow passes only if all steps `present`.

## Output

`functional-completeness-report.md` with **Overall result:** `pass` | `fail`

## Pipeline gate

| Result | Action |
|--------|--------|
| `pass` | Proceed to Agent 3 + MR gate 02 |
| `fail` | **Stop** — return to Agent 2 with new `T-###` tasks; do **not** write test cases |

## Example

FUN-001: Service A → Mongo → scheduler Service B → RabbitMQ → Service C mail  
Verify each hop exists in code before Agent 3.
