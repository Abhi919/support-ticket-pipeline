#!/usr/bin/env bash
# Bridge specs/<TICKET>/ to OpenSpec change folder openspec/changes/<slug>/
# Called from spec-bootstrap.sh after creating pipeline artifacts.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TICKET="${1:-}"

if [[ -z "$TICKET" ]]; then
  echo "Usage: $0 <WORK-ITEM-ID>" >&2
  exit 1
fi

SPEC_DIR="$ROOT/specs/$TICKET"
if [[ ! -d "$SPEC_DIR" ]]; then
  echo "Missing $SPEC_DIR — run spec-bootstrap.sh first" >&2
  exit 1
fi

SLUG="$(echo "$TICKET" | tr '[:upper:]' '[:lower:]')"
CHANGE_DIR="$ROOT/openspec/changes/$SLUG"
mkdir -p "$CHANGE_DIR/specs/pipeline"

ISO="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

cat > "$CHANGE_DIR/proposal.md" <<MD
# Proposal: $TICKET

**Bridged from:** \`specs/$TICKET/\` (unified pipeline)  
**Created:** $ISO

## Intent

See \`specs/$TICKET/requirements.md\` (problem statement + FUN-### flows).

## Scope

Tracked in pipeline spec artifacts. OpenSpec delta specs live under \`openspec/changes/$SLUG/specs/\`.

## Approach

See \`specs/$TICKET/architecture.md\` and \`approach-document.html\` (stakeholder view).

## Pipeline link

- Manifest: \`specs/$TICKET/spec-manifest.json\`
- After implementation: \`openspec archive $SLUG\` (when OpenSpec CLI installed) merges deltas into \`openspec/specs/\`
MD

cat > "$CHANGE_DIR/design.md" <<MD
# Design: $TICKET

**Source:** \`specs/$TICKET/architecture.md\`, \`data-model.md\`, \`api-contract.md\`

Maintain design in the pipeline folder; this file summarizes for OpenSpec archive workflow.
MD

cat > "$CHANGE_DIR/tasks.md" <<MD
# Tasks: $TICKET

**Canonical task list:** \`specs/$TICKET/tasks.md\` (T-### IDs)

Sync task checkboxes there during Agent 2 implementation.
MD

cat > "$CHANGE_DIR/specs/pipeline/spec.md" <<MD
# Delta for Pipeline Work Item $TICKET

## ADDED Requirements

### Requirement: Work item $TICKET specification package

The project SHALL maintain a complete specification under \`specs/$TICKET/\` before implementation.

#### Scenario: Specification gate
- GIVEN work item $TICKET is bootstrapped
- WHEN Agent 1 completes spec artifacts including FUN-### flows
- THEN MR gate 01 blocks implementation until approved

See \`specs/$TICKET/requirements.md\` for full ADDED requirements during active development.
MD

cat > "$CHANGE_DIR/.openspec-bridge.json" <<JSON
{
  "ticketId": "$TICKET",
  "changeSlug": "$SLUG",
  "pipelineSpecDir": "specs/$TICKET",
  "bridgedAt": "$ISO"
}
JSON

# Update manifest if jq available, else note in echo
MANIFEST="$SPEC_DIR/spec-manifest.json"
if command -v jq >/dev/null 2>&1 && [[ -f "$MANIFEST" ]]; then
  tmp="$(mktemp)"
  jq --arg slug "$SLUG" '.openspec = {"changeSlug": $slug, "changeDir": ("openspec/changes/" + $slug)}' \
    "$MANIFEST" > "$tmp" && mv "$tmp" "$MANIFEST"
fi

echo "OpenSpec bridge: $CHANGE_DIR"
echo "CLI: openspec validate $SLUG  |  openspec archive $SLUG  (after npm install)"
