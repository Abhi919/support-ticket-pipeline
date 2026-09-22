# Template: Implementation documentation (Agent 2b)

**Variables:** `{{TICKET_ID}}`, `{{FEATURE_BRANCH}}`, `{{PARENT_BRANCH}}`

## Prompt

You are **Agent 2b** (`PIPELINE.md` stage 2b). Implementation for **{{TICKET_ID}}** is complete.

Create:

1. `specs/{{TICKET_ID}}/technical-documentation.html` — full technical detail  
2. `specs/{{TICKET_ID}}/deployment-details.md` — deploy & branch info

**Read:** `implementation-notes.md`, `tasks.md`, `architecture.md`, `data-model.md`, `api-contract.md`, `requirements.md` (FUN flows), and **scan the codebase** for actual classes/collections/queues.

**Follow:** `steering/implementation-documentation.md`  
**Templates:** `technical-documentation.template.html`, `deployment-details.template.md`

**Deployment details must include:**

- Feature branch: `{{FEATURE_BRANCH}}` (detect via git if not provided)
- Parent branch: `{{PARENT_BRANCH}}` (e.g. main, develop)
- Every service/module touched
- Deploy order and rollback notes

**Technical HTML must include:**

- Services, Mongo collections / SQL tables, RabbitMQ topology, schedulers, scripts, key config properties (names only)
- FUN-### → code file mapping table

No secrets in either document.

**Next:** Agent 2c functional completeness verification.
