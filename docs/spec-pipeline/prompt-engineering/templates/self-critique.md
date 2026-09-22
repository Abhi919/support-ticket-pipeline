# Template: Self-critique before handoff

**Variables:** `{{TICKET_ID}}`, `{{STAGE}}` (agent1 | agent2 | agent3 | agent4)

## Prompt

Verify outputs for **{{TICKET_ID}}** stage **{{STAGE}}** against the approved spec. Act as a strict reviewer.

**Check:**

1. Every `AC-###` in `requirements.md` is reflected in spec/design/tasks/tests (as applicable to stage)
2. No code/spec contradiction on state machines and API contracts
3. No secrets, no "build everything" scope creep
4. Task IDs and traceability present (Agent 2+)
5. NFR constraints acknowledged

**Output:** JSON matching `docs/spec-pipeline/prompt-engineering/schemas/self-critique.schema.json`

If `passed` is false, fix **blocker** findings before MR. Record material AI errors in `docs/ai-mistakes-log.md`.
