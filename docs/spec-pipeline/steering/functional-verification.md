# Functional completeness verification

Guidelines for **Agent 2c** (`functional-completeness-report.md`).

## Purpose

Before test-case authoring (Agent 3), verify **end-to-end functionality is implemented in code** — not unit-test coverage, but whether each `FUN-###` flow in `requirements.md` has all required code paths present.

## Source of truth

`requirements.md` → **Functionality flows** section (`FUN-###`).

## Verification method

For each `FUN-###`:

1. Parse the flow steps (services, collections, queues, schedulers, APIs).
2. Search the codebase for evidence each step is implemented (classes, repos, listeners, configs).
3. Mark each step: `present` | `partial` | `missing` | `not_applicable`.
4. Overall flow: `pass` only if all steps are `present` or `not_applicable`.

## Outcomes

| Report result | Pipeline action |
|---------------|-----------------|
| **pass** | Proceed to Agent 3 (testing) / MR gate 02 |
| **fail** | Return to Agent 2 — add `T-###` tasks for gaps; do **not** start test cases |

## Example (microservice mail flow)

| Step | Expected evidence | Status |
|------|-------------------|--------|
| Create & persist message | Entity, repository, service in Service A | |
| Scheduler reads Mongo | `@Scheduled` or job, query on collection | |
| Publish to RabbitMQ | Producer config, exchange/queue binding | |
| Consumer sends mail | Listener, mail client, status update | |

## Do not

- Replace Agent 3 testing — this is a **pre-test functional gap check**.
- Pass based on documentation alone — require code references (file paths).
