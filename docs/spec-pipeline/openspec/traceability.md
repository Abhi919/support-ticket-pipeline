# Traceability — spec tasks ↔ code ↔ tests

## ID conventions

| Prefix | Example | Used in |
|--------|---------|---------|
| `AC-` | `AC-007` | `requirements.md` acceptance criteria |
| `NFR-` | `NFR-002` | Non-functional constraints |
| `T-` | `T-004` | `tasks.md` implementation tasks |
| `FUN-` | `FUN-001` | `requirements.md` functionality flows (Agent 2c source) |
| `TC-` | `TC-012` | `test-cases.md` test cases |

## Commit messages

```
T-004: enforce invalid CLOSED → OPEN transition

Refs: AC-009, TC-003
Spec: specs/PROJ-1234/state-machine.md
```

## Pull requests

Use `.github/pull_request_template.md`. Every PR that implements work must list:

- Task IDs completed
- AC IDs satisfied
- Spec files touched (if drift)
- Test evidence (`mvn test`, specific test class)

## spec-manifest.json traceability block

After task generation, Agent 2 may populate:

```json
"traceability": {
  "acceptanceCriteria": ["AC-001", "AC-002"],
  "tasks": [
    { "id": "T-001", "status": "done", "commits": ["abc1234"] }
  ]
}
```

Statuses: `pending` | `in_progress` | `done` | `blocked` | `cancelled`.

## Review verification

Agent 4 must confirm every `AC-###` has at least one `T-###`, every `FUN-###` passed Agent 2c, and (where applicable) `TC-###` or automated test reference.
