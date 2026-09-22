# Prompt engineering — pipeline execution layer

> Part of the **unified pipeline** — see `../PIPELINE.md`. Templates are **how each agent stage runs**, not a separate process.

## Stage → template map

| Pipeline stage | Template(s) |
|----------------|-------------|
| 1 Specification | `templates/agent-1-spec-write.md` |
| 1b Stakeholder approach | `templates/agent-1b-approach-html.md` |
| 2 Plan | `templates/task-decompose.md` |
| 2 Implement | `templates/task-execute.md` |
| 2b Implementation docs | `templates/agent-2b-impl-docs.md` |
| 2c Functional verify | `templates/agent-2c-functional-check.md` |
| Any (pre-MR) | `templates/self-critique.md` |
| Any (long context) | `templates/context-compress.md` |

## Principles (embedded in every stage)

| Technique | Use |
|-----------|-----|
| Templates + variables | `{{TICKET_ID}}`, `{{TASK_ID}}`, `{{REQUIREMENT_SOURCE}}` |
| Few-shot examples | Inside each template |
| Output constraints | `schemas/task-list.schema.json`, `schemas/self-critique.schema.json` |
| Prompt chaining | Compress → generate → critique → MR (no monolithic prompt) |
| Caching / compression | `context-optimization.md` |
| Self-critique | Before each MR gate |

## Recording

- SpecStory → `.specstory/history/`
- Index → `docs/prompt-history.md`
- Wrong AI output → `docs/ai-mistakes-log.md`

## Do not

- Ask to build the entire application in one prompt.
- Skip templates for stage work.
