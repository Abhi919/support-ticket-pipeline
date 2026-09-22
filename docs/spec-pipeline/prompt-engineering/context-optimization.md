# Context optimization — caching & compression

## What gets "cached" (provider-dependent)

In Cursor/Claude-style APIs, **prompt caching** typically applies to a **stable prefix** of the request. In this pipeline, put stable content first:

1. `AGENTS.md` + relevant `.cursor/rules/*.mdc`
2. `docs/spec-pipeline/steering/*.md` (only files needed for the stage)
3. The **template body** (unchanged across tickets)

Put **variable** content last:

- Ticket id, paths under `specs/<ID>/`
- Pasted Jira excerpt
- Diff snippets for the current task only

## Cache invalidation

Invalidate or refresh the prefix when you change:

- Steering files or rules
- Template wording
- Schema versions under `prompt-engineering/schemas/`

Ticket-specific files do **not** invalidate the steering prefix.

## Compression (trim without losing signal)

Before a long agent turn:

1. Run `templates/context-compress.md` on the spec folder → ≤ 40 bullets.
2. For Agent 2 implementation, include only:
   - `tasks.md` rows for current `T-###`
   - Relevant `api-contract.md` / `state-machine.md` sections
3. Use `docs/spec-pipeline/steering/skill-routing.md` — load **matched** skills only.

## Token plugins

Optional MCP/plugins (Graphify, Caveman, Codebase-memory MCP): use to summarize large trees **before** pasting into chat. Document usage in `docs/prompt-history.md` when used.

## Cost/latency wins

- Reuse the same template file path across tickets (stable prefix).
- Avoid re-attaching full `spring-boot-aws-lambda-poc/` tree; reference paths.
- One task per implementation prompt (`T-###` scope).
