# Functional completeness report — {{TICKET_ID}}

**Generated:** {{ISO_DATE}}  
**Agent:** 2c — Functional completeness verifier  
**Source of truth:** `requirements.md` → Functionality flows (`FUN-###`)

## Overall result

`pass` | `fail` <!-- Agent 2c sets one; fail blocks Agent 3 -->

## Summary

| Metric | Count |
|--------|-------|
| Flows evaluated | |
| Flows passed | |
| Flows failed | |
| Blocking gaps | |

## Per-flow verification

### FUN-001 — <!-- flow name -->

**Requirement excerpt:** <!-- quote from requirements.md -->

| Step | Expected implementation | Evidence (file / class) | Status |
|------|-------------------------|-------------------------|--------|
| 1 | | | present / partial / missing |
| 2 | | | |

**Flow result:** `pass` | `fail`

---

<!-- Repeat per FUN-### -->

## Gaps → Agent 2 tasks

| Gap | Suggested T-### | Priority |
|-----|-----------------|----------|
| | | blocker |

## Sign-off

- [ ] All FUN-### flows `pass` — proceed to Agent 3 (testing)
- [ ] Failures documented — return to Agent 2 implementation
