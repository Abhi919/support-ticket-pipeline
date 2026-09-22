# Implementation documentation standards

Guidelines for **Agent 2b** outputs after implementation.

## Artifacts

| File | Audience | Content |
|------|----------|---------|
| `technical-documentation.html` | Developers, ops | Full technical detail: services, modules, collections/tables, queues, configs, scripts, env vars (names only), key classes, diagrams |
| `deployment-details.md` | DevOps, release managers | Services list, feature branch, parent/base branch, deployment order, config profiles, rollback notes |

## Technical HTML depth

- **More detailed than** `approach-document.html` (stakeholder doc).
- Include: service names, package boundaries, persistence (collection/table names), messaging topology, scheduled jobs, external integrations, migration/script paths.
- Mermaid or ASCII diagrams encouraged.
- No secrets — use placeholders for credentials.

## Deployment details required fields

```markdown
## Branches
- Feature branch: spec/<TICKET>/stage-02-agent2 (or actual)
- Parent / target branch: main | develop | release/x

## Services touched
| Service | Change type | Notes |

## Deploy order
1. ...

## Configuration
- Profiles, feature flags, new env vars (names only)
```

## Template

- HTML: `templates/technical-documentation.template.html`
- MD: `templates/deployment-details.template.md`
