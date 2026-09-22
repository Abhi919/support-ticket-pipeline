#!/usr/bin/env bash
# Bootstrap OpenSpec folder for a work item. Usage: ./scripts/spec-bootstrap.sh PROJ-1234
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

TICKET="${1:-}"
if [[ -z "$TICKET" ]]; then
  echo "Usage: $0 <WORK-ITEM-ID>" >&2
  exit 1
fi

if ! [[ "$TICKET" =~ ^[A-Za-z][A-Za-z0-9_]*-[0-9]+$ ]]; then
  echo "Work item id looks invalid (expected like PROJ-123). Got: $TICKET" >&2
  exit 1
fi

SPEC_DIR="specs/${TICKET}"
if [[ -d "$SPEC_DIR" ]]; then
  echo "Spec folder already exists: $SPEC_DIR (aborting)" >&2
  exit 1
fi

mkdir -p "$SPEC_DIR"

ISO="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

cat > "${SPEC_DIR}/spec-manifest.json" <<EOF
{
  "ticketId": "${TICKET}",
  "createdAt": "${ISO}",
  "pipelineVersion": 4,
  "pipelineDoc": "docs/spec-pipeline/PIPELINE.md",
  "specRevision": 1,
  "workflow": "requirement-spec-approach-implement-docs-verify-test-review-fix",
  "stages": {
    "bootstrap": { "status": "complete" },
    "agent1": { "status": "pending", "label": "specification", "branch": "spec/${TICKET}/stage-01-agent1" },
    "agent1b": { "status": "blocked", "label": "stakeholder_approach", "branch": "spec/${TICKET}/stage-01-agent1" },
    "agent2": { "status": "blocked", "label": "plan_and_implementation", "branch": "spec/${TICKET}/stage-02-agent2" },
    "agent2b": { "status": "blocked", "label": "implementation_documentation", "branch": "spec/${TICKET}/stage-02-agent2" },
    "agent2c": { "status": "blocked", "label": "functional_completeness", "branch": "spec/${TICKET}/stage-02-agent2" },
    "agent3": { "status": "blocked", "label": "testing", "branch": "spec/${TICKET}/stage-03-agent3" },
    "agent4": { "status": "blocked", "label": "review", "branch": "spec/${TICKET}/stage-04-agent4" },
    "agent5": { "status": "blocked", "label": "security", "branch": "spec/${TICKET}/stage-05-agent5" },
    "final": { "status": "blocked" }
  },
  "traceability": {
    "acceptanceCriteria": [],
    "tasks": []
  },
  "openspec": {
    "changeSlug": null,
    "changeDir": null
  },
  "notes": "Human sets each stage to approved after MR review. OpenSpec bridged on bootstrap."
}
EOF

touch "${SPEC_DIR}/.spec_created"

write_stub() {
  local f="$1"
  local title="$2"
  local hint="${3:-}"
  cat > "${SPEC_DIR}/${f}" <<MD
# ${title}

**Ticket:** ${TICKET}
**Status:** stub (fill during pipeline)
**Last updated:** ${ISO}

${hint}

---

MD
}

write_stub "requirements.md" "Requirements" "Include Functionality flows FUN-### — source of truth for Agent 2c. Template: docs/spec-pipeline/templates/requirements.template.md"
write_stub "context-analysis.md" "Context analysis" ""
write_stub "architecture.md" "Architecture" ""
write_stub "data-model.md" "Data model" ""
write_stub "api-contract.md" "API contract" ""
write_stub "state-machine.md" "State machine" "Mark N/A if not applicable."
write_stub "ui-flow.md" "UI flow" "Mark N/A for backend-only work."
write_stub "test-strategy.md" "Test strategy" "Agent 1 — completes specification phase."
write_stub "design.md" "Technical design" "Agent 2 — optional supplement to architecture.md."
write_stub "tasks.md" "Implementation tasks" "Agent 2 — use docs/spec-pipeline/templates/tasks.template.md (T-### IDs)."
write_stub "implementation-notes.md" "Implementation notes" ""
write_stub "spec-diff.md" "Spec diff log" "Append when spec drift occurs — docs/spec-pipeline/openspec/spec-drift.md."
write_stub "test-cases.md" "Test cases" "TC-### linked to AC-###."
write_stub "review-report.md" "Principal review report" ""
write_stub "security-audit.md" "Security audit" ""
write_stub "vulnerability-fixes.md" "Vulnerability fixes / remediations" ""
write_stub "final-summary.md" "Final summary" ""

write_html_stub() {
  local f="$1"
  local title="$2"
  cat > "${SPEC_DIR}/${f}" <<HTML
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>${title} — ${TICKET}</title></head>
<body>
<h1>${title}</h1>
<p><em>Stub — ${ISO}</em></p>
<p>Ticket: ${TICKET}</p>
</body>
</html>
HTML
}

write_html_stub "approach-document.html" "Stakeholder approach"
write_html_stub "technical-documentation.html" "Technical documentation"
write_stub "deployment-details.md" "Deployment details" "Agent 2b — feature branch, parent branch, services. Template: docs/spec-pipeline/templates/deployment-details.template.md"
write_stub "functional-completeness-report.md" "Functional completeness report" "Agent 2c — overall result pass/fail. Template: docs/spec-pipeline/templates/functional-completeness-report.template.md"

write_gate() {
  local n="$1"
  local stage="$2"
  local after="$3"
  local next_agent="$4"
  local next_files="$5"
  cat > "${SPEC_DIR}/mr-gate-0${n}-${stage}.md" <<MD
# MR gate 0${n} — after ${after}

**Ticket:** ${TICKET}

## Purpose

Human merge request review **before** ${next_agent}.

## Author checklist (agent)

- [ ] All artifacts for this stage are committed on branch documented in \`spec-manifest.json\`.
- [ ] Traceability: AC / T / TC IDs used per \`docs/spec-pipeline/openspec/traceability.md\`
- [ ] Self-critique run (\`prompt-engineering/templates/self-critique.md\`) — blockers resolved
- [ ] Prompt session indexed in \`docs/prompt-history.md\`
- [ ] No secrets or internal-only URLs in markdown or code

## Reviewer checklist (human MR)

- [ ] Scope matches work item ${TICKET}
- [ ] OpenSpec quality (spec stage): problem/AC/NFR complete
- [ ] Spec drift documented in \`spec-diff.md\` if applicable
- [ ] CI / \`mvn test\` green when code is in scope
- [ ] Approve MR per team process

## After approval

1. Merge the MR (or record approval per team policy).
2. Update \`spec-manifest.json\` — set the relevant \`stages.*.status\` to \`approved\`.
3. Continue pipeline: ${next_files}

Suggested MR title: \`[Spec Pipeline] ${TICKET} — Stage 0${n} ${after}\`
Use \`.github/pull_request_template.md\` for traceability table.
MD
}

write_gate 1 "agent1" "Specification + stakeholder approach (Agents 1 & 1b)" "Agent 2 (plan & implement)" "Spec artifacts, \`approach-document.html\`, FUN-### in requirements; \`.cursor/commands/review-spec.md\`; MR 01 → \`prompts/agent-2-implementation.md\`."
write_gate 2 "agent2" "Implementation + docs + functional verify (Agents 2, 2b, 2c)" "Agent 3 (testing)" "Code complete, \`technical-documentation.html\`, \`deployment-details.md\`, \`functional-completeness-report.md\` = pass; then \`prompts/agent-3-testing.md\`."
write_gate 3 "agent3" "Testing (Agent 3)" "Agent 4 (review)" "\`test-cases.md\` + tests; then \`docs/spec-pipeline/prompts/agent-4-review.md\`."
write_gate 4 "agent4" "Review (Agent 4)" "Agent 5 (security)" "\`review-report.md\`; fix loop via Agent 2 if blockers; then \`docs/spec-pipeline/prompts/agent-5-security.md\`."
write_gate 5 "agent5" "Security (Agent 5)" "final summary" "\`security-audit.md\`, \`vulnerability-fixes.md\`, then \`final-summary.md\` and \`stages.final.status\` → \`ready_for_merge\`."

echo "Bootstrapped: ${SPEC_DIR}"
"$ROOT/scripts/openspec-bridge.sh" "${TICKET}" || echo "Warning: OpenSpec bridge failed (openspec/ may be missing)" >&2
echo "Unified pipeline: docs/spec-pipeline/PIPELINE.md"
echo "Stage 1 (spec) → 1b (approach HTML) → MR 01 → 2 (code) → 2b (tech docs) → 2c (functional verify) → MR 02 → 3 (tests)…"
