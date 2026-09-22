# Token optimization

Efficient context use improves latency, cost, and answer quality.

## Practices in this repo

1. **Stable prefix** — rules + steering + templates first; ticket content last (`prompt-engineering/context-optimization.md`).
2. **Skill routing** — load only matched files from `docs/spec-pipeline/skills/`.
3. **Context compress** — run `templates/context-compress.md` before long implementation turns.
4. **One task per prompt** — `T-###` scope via `templates/task-execute.md`.
5. **Path references** — `@specs/SUPPORT-2847/requirements.md` instead of pasting full files when already in workspace.

## Optional tooling

Use when exploring large codebases:

- **Graphify** — structure visualization
- **Caveman** — context reduction
- **Codebase-memory MCP** — persistent summaries

Document when used in `docs/prompt-history.md`.

## Prompt caching (awareness)

Caching benefits repeat sessions with the **same** steering prefix. Changing `.cursor/rules/` or templates invalidates cache for that prefix.

## Anti-patterns

- Attaching entire repo tree every message
- Duplicating `api-contract.md` in chat after it exists on disk
- Mixing multiple `T-###` tasks in one prompt
