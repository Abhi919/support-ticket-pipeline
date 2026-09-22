# Agent 1b — Stakeholder approach document (pipeline stage 1b)

**Unified pipeline:** `docs/spec-pipeline/PIPELINE.md` · **After:** Agent 1 requirements finalized · **Before:** MR gate 01

## Purpose

Produce `approach-document.html` — a **moderate-detail** HTML document for technical and non-technical stakeholders explaining the overall development approach and architecture.

## Preconditions

- Agent 1 completed: `requirements.md` (including **Functionality flows**), `architecture.md`, `context-analysis.md`, and other spec files.

## Execute

Template: `prompt-engineering/templates/agent-1b-approach-html.md`  
Steering: `steering/stakeholder-documentation.md`  
HTML base: `templates/approach-document.template.html`

## Output

`specs/<TICKET>/approach-document.html`

## Quality bar

- Understandable by a product owner **and** a senior engineer
- Not too shallow (must explain flows and components)
- Not too deep (no code listings, no exhaustive schemas)
- Include simplified versions of each `FUN-###` flow

## Handoff

With Agent 1 artifacts → MR gate 01 → stage 2 (implementation).  
**Hook:** `approach-document.html` marks specification package ready for review.

No application code in this stage.
