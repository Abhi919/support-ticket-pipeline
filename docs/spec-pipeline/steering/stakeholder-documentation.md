# Stakeholder approach documents

Guidelines for **Agent 1b** HTML output (`approach-document.html`).

## Audience

Technical and non-technical stakeholders. Assume no code access.

## Tone and depth

- **Moderate detail** — enough to explain architecture and data flow; not class-level design or full API listings.
- Plain language for concepts; glossary for unavoidable jargon.
- Visual structure: sections, diagrams (ASCII or Mermaid in HTML), tables.

## Required sections in `approach-document.html`

1. **Executive summary** (3–5 sentences)
2. **Problem & goals** (from `requirements.md`)
3. **Proposed approach** (how we will solve it)
4. **Architecture overview** (components, interactions — from `architecture.md`)
5. **Key flows** (from `requirements.md` → Functionality flows — simplified)
6. **Data & integrations** (high level: DB, queues, external APIs)
7. **Risks & mitigations** (from `context-analysis.md`)
8. **Out of scope** reminder
9. **What happens next** (implementation phases at high level)

## Do not include

- Full source code, pom.xml, or deployment secrets
- Exhaustive field-level schemas (point to `data-model.md` for implementers)

## Template

Start from `docs/spec-pipeline/templates/approach-document.template.html`.
