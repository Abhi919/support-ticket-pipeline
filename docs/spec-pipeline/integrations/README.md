# OpenSpec + SpecStory integrations

**Setup status (this repo):** ✅ Installed — SpecStory extension v2.0.1 · OpenSpec CLI via `npm install` · portable Node in `.tools/node/`

Reload Cursor after setup so `/opsx-*` slash commands appear. Send **one chat message** to create the first `.specstory/history/` file.

Both tools are **wired into the unified pipeline** — not separate workflows.

## SpecStory (prompt history)

| Piece | Location |
|-------|----------|
| Extension | `SpecStory.specstory-vscode` (recommended in `.vscode/extensions.json`) |
| Auto-save setting | `.vscode/settings.json` → `specstory.autoSave` |
| Session files | `.specstory/history/*.md` |
| Human index | `docs/prompt-history.md` |
| Auto-index script | `scripts/specstory-index.py` |
| Cursor hook | `sessionEnd` → `scripts/cursor/specstory-session-end.py` |

### Setup (one time)

```bash
bash scripts/setup-integrations.sh   # installs extension + npm deps + openspec init
```

Then **reload Cursor** and send one chat message. Index with `npm run specstory:index`.

## OpenSpec (Fission-AI CLI)

| Piece | Location |
|-------|----------|
| Config | `openspec/config.yaml` |
| Source specs | `openspec/specs/` |
| Active changes | `openspec/changes/<slug>/` |
| Bridge from pipeline | `scripts/openspec-bridge.sh` (called by `spec-bootstrap.sh`) |
| npm package | `@fission-ai/openspec` in `package.json` |
| Cursor commands | `.cursor/commands/opsx-*.md` |
| Cursor skills | `.cursor/skills/openspec-*/SKILL.md` |

### Setup (one time)

```bash
bash scripts/setup-integrations.sh
# or: npm install && npm run openspec:init && npm run openspec:update
```

Uses portable Node at `.tools/node/` if system npm is missing.

### Workflow with unified pipeline

```text
./scripts/spec-bootstrap.sh PROJ-1234
  → specs/PROJ-1234/           (pipeline artifacts)
  → openspec/changes/proj-1234/ (OpenSpec change + delta spec)

Pipeline stages 1→5 (agents, MR gates)
  → propose/plan: /opsx-propose or Agent 1 templates
  → implement:   /opsx-apply or Agent 2 task-execute
  → archive:     /opsx-archive after MR merges specs into openspec/specs/
```

### CLI commands (terminal)

```bash
npx openspec list
npx openspec validate proj-1234
npx openspec archive proj-1234
```

### Cursor slash commands

| Command | Maps to |
|---------|---------|
| `/opsx-propose` | OpenSpec propose + pipeline stage 1 |
| `/opsx-apply` | OpenSpec apply + pipeline stage 2 |
| `/opsx-sync` | Sync delta specs with `specs/<ID>/` |
| `/opsx-archive` | Archive change → `openspec/specs/` |

## Single setup script

```bash
bash scripts/setup-integrations.sh
```
