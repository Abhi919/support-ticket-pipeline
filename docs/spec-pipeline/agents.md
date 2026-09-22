# Agent roles — unified pipeline

Full map: **`PIPELINE.md`**

| Stage | Agent | Prompt | Templates / commands | Steering |
|-------|-------|--------|-------------------|----------|
| 0 | Orchestrator | `prompts/orchestrator-bootstrap.md` | `spec-bootstrap.sh` | `PIPELINE.md` |
| 1 | Specification | `prompts/agent-1-ticket-context.md` | `agent-1-spec-write.md`, `review-spec` | product, jira-analysis, coding-standards |
| **1b** | **Stakeholder approach** | `prompts/agent-1b-stakeholder-approach.md` | `agent-1b-approach-html.md`, `approach-document.template.html` | `stakeholder-documentation.md` |
| 2 | Plan + implement | `prompts/agent-2-implementation.md` | `task-decompose.md`, `task-execute.md` | skill-routing → skills |
| **2b** | **Implementation docs** | `prompts/agent-2b-implementation-docs.md` | `agent-2b-impl-docs.md`, technical + deployment templates | `implementation-documentation.md` |
| **2c** | **Functional verify** | `prompts/agent-2c-functional-verification.md` | `agent-2c-functional-check.md`, `verify-functional-completeness` | `functional-verification.md` |
| 3 | Testing | `prompts/agent-3-testing.md` | `generate-tests` | testing-standards |
| 4 | Review | `prompts/agent-4-review.md` | `review-code` | review-checklist |
| 5 | Security | `prompts/agent-5-security.md` | — | security-policies |

## Key artifacts (custom agents)

| File | Agent |
|------|-------|
| `approach-document.html` | 1b |
| `technical-documentation.html` | 2b |
| `deployment-details.md` | 2b |
| `functional-completeness-report.md` | 2c |
| `requirements.md` → `FUN-###` | 1 (source for 2c) |

Cursor: `.cursor/rules/spec-pipeline.mdc`, `.cursor/hooks.json`
