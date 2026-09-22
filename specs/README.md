# Specs directory — unified pipeline artifacts

```bash
./scripts/spec-bootstrap.sh <WORK-ITEM-ID>
```

**Map:** `docs/spec-pipeline/PIPELINE.md`

## Stages → files

| Stage | Files |
|-------|--------|
| 1 Specification | `requirements.md` (**FUN-###**), `context-analysis.md`, `architecture.md`, `data-model.md`, `api-contract.md`, `state-machine.md`, `ui-flow.md`, `test-strategy.md` |
| 1b Stakeholder approach | `approach-document.html` |
| 2 Implement | `tasks.md`, code, `implementation-notes.md`, `spec-diff.md` |
| 2b Docs | `technical-documentation.html`, `deployment-details.md` |
| 2c Functional verify | `functional-completeness-report.md` (`pass`/`fail`) |
| 3 Testing | `test-cases.md` + tests |
| 4–5 | `review-report.md`, `security-audit.md`, `vulnerability-fixes.md` |
| Final | `final-summary.md` |
| Process | `spec-manifest.json`, `mr-gate-0*.md` |

IDs: `AC-`, `NFR-`, `FUN-`, `T-`, `TC-` — `openspec/traceability.md`.
