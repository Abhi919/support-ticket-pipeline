# Review spec (pipeline stage 1 — before MR gate 01)

Review specification artifacts as part of the **unified pipeline** (`docs/spec-pipeline/PIPELINE.md`).

## Steps

1. Identify `TICKET_ID` under `specs/<TICKET_ID>/`.
2. Read all spec files plus `approach-document.html` (stage 1b).
3. Verify **Functionality flows** (`FUN-###`) are complete and clear for Agent 2c.
4. Check OpenSpec quality per `docs/spec-pipeline/openspec/README.md`:
   - Problem statement vs solution sketch
   - Numbered `AC-###` with verification
   - Explicit `NFR-###`
   - State machine completeness (valid + invalid transitions)
4. Flag gaps, contradictions, and missing N/A rationale.
5. Output JSON self-critique optional: `prompt-engineering/schemas/self-critique.schema.json`.

Do **not** generate application code in this command.

Record session in `docs/prompt-history.md`.
