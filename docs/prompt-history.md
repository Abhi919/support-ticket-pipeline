# Prompt history index

Index of AI-assisted development sessions on this repo.

## Storage

| Location | Purpose |
|----------|---------|
| `.specstory/history/` | Auto-captured via [SpecStory](https://github.com/specstoryai/getspecstory) extension |
| This file | Human index of meaningful sessions |

## Pipeline execution — SUPPORT-2847 (2026-09-13)

Stages executed per `docs/spec-pipeline/PIPELINE.md` and `prompts/agent-*.md`.

| Stage | Prompt / command | Template | Outcome |
|-------|------------------|----------|---------|
| 0 | `./scripts/spec-bootstrap.sh SUPPORT-2847` | orchestrator-bootstrap | `specs/SUPPORT-2847/` created |
| 1 | Agent 1 — Specification | `agent-1-spec-write.md` | Spec files + FUN-###; `self-critique-agent1.json` pass |
| 1b | Agent 1b — Stakeholder approach | `agent-1b-approach-html.md` | `approach-document.html` |
| MR01 | — | `mr-gate-01-agent1.md` | Approved → Agent 2 |
| 2A | Task decomposition | `task-decompose.md` | `tasks.md` T-001…T-009 |
| 2B | Execute T-001…T-009 (one task per turn) | `task-execute.md` | Code in `support-ticket-*`; `implementation-notes.md` |
| 2b | Agent 2b — Impl docs | `agent-2b-impl-docs.md` | `technical-documentation.html`, `deployment-details.md` |
| 2c | Agent 2c — Functional verify | `verify-functional-completeness` | `functional-completeness-report.md` **pass** |
| MR02 | — | `mr-gate-02-agent2.md` | Approved → Agent 3 |
| 3 | Agent 3 — Testing | `generate-tests.md` | `test-cases.md`; 12 tests green |
| MR03 | — | `mr-gate-03-agent3.md` | Approved → Agent 4 |
| 4 | Agent 4 — Review | `review-code.md` | `review-report.md` — no blockers |
| MR04 | — | `mr-gate-04-agent4.md` | Approved → Agent 5 |
| 5 | Agent 5 — Security | `agent-5-security.md` | `security-audit.md`, `vulnerability-fixes.md` |
| MR05 | — | `mr-gate-05-agent5.md` | `final-summary.md` ready_for_merge |

## Session log (append below)

| Date | Work item | Stage | Template / command | Notes |
|------|-----------|-------|-------------------|-------|
| 2026-09-13 | SUPPORT-2847 | — | **Main session (backfilled)** | `.specstory/history/2026-09-13_08-38-00Z-support-ticket-mvp-SUPPORT-2847.md` — user prompts + pipeline stage prompts |
| 2026-09-13 | SUPPORT-2847 | 1 | agent-1-spec-write | No code in stage 1 |
| 2026-09-13 | SUPPORT-2847 | 2 | task-execute T-001…T-009 | Rebuilt app post-MR01; subagent logs in `08-59-15Z-rebuild-*` |
| 2026-09-13 | SUPPORT-2847 | 2c | verify-functional-completeness | All FUN flows pass |
| 2026-09-13 | SUPPORT-2847 | 3 | generate-tests | mvn test 12/12 |

## What to record

- Which **template** was used (`prompt-engineering/templates/…`)
- **Variables** set (`TICKET_ID`, `TASK_ID`)
- Whether **self-critique** passed
- Link to MR or commit range

## What not to record

- API keys, tokens, passwords
- Full pasted credentials from Jira/GitHub


## Auto-indexed SpecStory sessions

<!-- specstory-auto-index -->
| 2026-09-13 | SUPPORT-2847 | main | backfill | `.specstory/history/2026-09-13_08-38-00Z-support-ticket-mvp-SUPPORT-2847.md` |
| 2026-09-13 | (see file) | auto | SpecStory | `.specstory/history/2026-09-13_08-59-15Z-rebuild-backend-t-001.md` |
| 2026-09-13 | (see file) | auto | SpecStory | `.specstory/history/2026-09-13_08-59-15Z-rebuild-frontend-t-007.md` |
| 2026-09-13 | (see file) | auto | SpecStory | `.specstory/history/2026-06-16_08-11-01Z-at-kiro-tech-poc.md` |
| 2026-09-13 | (see file) | auto | SpecStory | `.specstory/history/2026-06-16_08-21-13Z-create-a-poc-project.md` |
| 2026-09-13 | (see file) | auto | SpecStory | `.specstory/history/2026-09-13_08-49-02Z-rebuild-backend-t-001.md` |
| 2026-09-13 | (see file) | auto | SpecStory | `.specstory/history/2026-09-13_08-49-03Z-rebuild-frontend-t-007.md` |
| 2026-09-13 | (see file) | auto | SpecStory | `.specstory/history/2026-06-16_09-27-18Z-automated-development-pipeline-creation.md` |
