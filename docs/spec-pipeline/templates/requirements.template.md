# Requirements — {{TICKET_ID}}

**Status:** draft | review | approved  
**Spec revision:** 1  
**Last updated:** {{ISO_DATE}}

## Problem statement

<!-- Who, pain, outcome. No solution yet. -->

## Acceptance criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-001 | | |

## Functionality flows

<!-- Source of truth for Agent 2c (functional completeness). One row per end-to-end capability. -->

Describe each capability as a **flow** from trigger to outcome across services/components.

| ID | Flow name | Description (trigger → steps → outcome) | Components / services | Done when |
|----|-----------|-------------------------------------------|----------------------|-----------|
| FUN-001 | | e.g. Service A writes message to Mongo → scheduler in B reads → RabbitMQ → Service C sends email | | |

**Example (moderate detail):**

> **FUN-001 — Async notification mail**  
> 1) API creates `OutboundMessage` and persists to `outbound_messages` (Service A).  
> 2) Scheduler in Service B polls collection, publishes to RabbitMQ exchange `mail.requests`.  
> 3) Service C consumes queue, calls mail provider, updates status.  
> **Done when:** message reaches terminal status `SENT` or `FAILED` with audit trail.

## Non-functional constraints

| ID | Constraint | Target / note |
|----|------------|---------------|
| NFR-001 | | |

## Out of scope

-

## Open questions

| ID | Question | Owner | Resolution |
|----|----------|-------|------------|
