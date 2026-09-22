# Deployment details — {{TICKET_ID}}

**Last updated:** {{ISO_DATE}}  
**Work item:** {{TICKET_ID}}

## Branches

| Role | Branch name |
|------|-------------|
| Feature branch | `spec/{{TICKET_ID}}/stage-02-agent2` |
| Parent / target branch | `main` <!-- or develop / release/x --> |

## Services touched

| Service | Repository / path | Change type | Version bump |
|---------|-------------------|-------------|--------------|
| | | new / modified | |

## Deploy order

1. <!-- e.g. shared library -->
2. <!-- e.g. service-a -->
3. <!-- e.g. service-b -->

## Infrastructure dependencies

| Dependency | Purpose | Notes |
|------------|---------|-------|
| MongoDB | | collection: |
| RabbitMQ | | exchange/queue: |

## Configuration & profiles

- Spring profiles:
- New environment variables (names only, no values):
- Feature flags:

## Rollback

- Steps to revert:
- Data migration rollback:

## Post-deploy verification

- [ ] Health endpoints
- [ ] Smoke test FUN-001 flow
