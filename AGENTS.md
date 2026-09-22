# Global governance — unified spec-driven SDLC pipeline (Cursor)

One pipeline under `specs/<WORK-ITEM-ID>/`. **Canonical map:** `docs/spec-pipeline/PIPELINE.md`.

## Agent stages (single flow)

| Stage | Agent | Purpose |
|-------|-------|---------|
| 1 | Ticket context | Specification + `FUN-###` flows |
| 1b | Stakeholder approach | `approach-document.html` for mixed audiences |
| 2 | Implementation | Tasks + code |
| 2b | Implementation docs | `technical-documentation.html`, `deployment-details.md` |
| 2c | Functional verify | `functional-completeness-report.md` — **pass** required before tests |
| 3 | Testing | Test cases + automation |
| 4 | Review | Principal review + fix loop |
| 5 | Security | Security audit + fix loop |

MR gates 01–05 group stages as defined in `PIPELINE.md`.

## Integrations

| Tool | Purpose | Setup |
|------|---------|--------|
| **SpecStory** | Auto-save prompts → `.specstory/history/` | Install extension; see `docs/spec-pipeline/integrations/README.md` |
| **OpenSpec** | Propose / apply / archive + delta specs | `npm install && npm run openspec:init` |

Bootstrap links both: `spec-bootstrap.sh` → `openspec-bridge.sh`

## Start

```bash
./scripts/spec-bootstrap.sh <WORK-ITEM-ID>
```

Agent index: `docs/spec-pipeline/agents.md`
