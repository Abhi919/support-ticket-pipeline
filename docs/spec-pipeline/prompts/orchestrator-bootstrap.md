# Orchestrator — unified pipeline entry (stage 0)

You receive a **work item id** (e.g. `PROJ-1234`).

## Run the single pipeline (`PIPELINE.md`)

1. `./scripts/spec-bootstrap.sh PROJ-1234`
2. **Stage 1** — specification (`agent-1-spec-write.md`) — include `FUN-###` flows
3. **Stage 1b** — `approach-document.html` (`agent-1b-stakeholder-approach.md`)
4. **MR 01** → **Stage 2** implement → **2b** docs → **2c** functional verify → **MR 02** → stages 3–5

One folder, one manifest, one flow. Record prompts in `docs/prompt-history.md`.
