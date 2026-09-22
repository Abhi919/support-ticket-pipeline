# Handling spec drift

**Spec drift** = the written specification no longer matches what we learned during design, implementation, or testing.

## When to record drift

- A state transition rule in code differs from `state-machine.md`.
- API shape in `api-contract.md` cannot satisfy a real integration constraint.
- Acceptance criteria are ambiguous or mutually contradictory.
- NFR (e.g. latency) is infeasible with chosen architecture.

## Process

1. **Stop** adding more code that depends on the wrong assumption.
2. **Document** in `specs/<ID>/spec-diff.md`:
   - Date, author/agent stage
   - **Was (spec):** quote or reference section
   - **Is (reality):** what we now know
   - **Reason:** discovery during T-### / test / review
   - **Decision:** `update-spec` | `descope` | `new-work-item`
3. **If `update-spec`:** edit the affected spec file(s) in the **same MR** as the code change (or a spec-only MR first if large). Bump `spec-manifest.json` → `specRevision`.
4. **Re-link tasks:** update `tasks.md` AC mapping; add new `T-###` if scope grew.
5. **Human MR gate:** reviewer must explicitly approve spec + code together when drift is material.
6. **Do not** delete `spec-diff.md` entries; append new sections (audit trail).

## Self-critique before handoff

Before closing Agent 2 (or after Agent 4 findings), run `docs/spec-pipeline/prompt-engineering/templates/self-critique.md` against the spec and changed files.

## Anti-patterns

- Fixing only code while leaving stale `api-contract.md`.
- "We'll update the doc later" without `spec-diff.md`.
- Broadening scope without new AC IDs or a new work item.
