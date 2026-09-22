# Spec-driven SDLC pipeline (Cursor)

**Single unified pipeline** — bootstrap, five agents, OpenSpec, prompt engineering, MCP, MR gates, and hooks work as **one unit**.

## Start here

1. Read **`PIPELINE.md`** (canonical end-to-end map).
2. Bootstrap: `./scripts/spec-bootstrap.sh <WORK-ITEM-ID>`
3. Follow stages 1→5 in `PIPELINE.md`; use `prompts/agent-*.md` or templates in `prompt-engineering/templates/`.

Governance: `AGENTS.md` · Example work item: `specs/SUPPORT-2847/`

## Subfolders (chapters of the same pipeline)

| Folder | Purpose |
|--------|---------|
| `openspec/` | Spec writing, tasks, traceability, drift |
| `prompt-engineering/` | Templates, schemas, chaining, compression |
| `mcp/` | Tool consumption and minimal server example |
| `prompts/` | Agent stage instructions |
| `steering/`, `skills/` | Shared standards |
| `templates/` | Artifact stubs |

Do not treat these as separate pipelines — each agent stage pulls from them as needed (see `PIPELINE.md` table).
