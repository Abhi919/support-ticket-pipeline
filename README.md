# Support ticket platform

Internal support ticket management with a spec-driven delivery pipeline.

## Applications

| Path | Description |
|------|-------------|
| `support-ticket-service/` | Java 21 Spring Boot REST API |
| `support-ticket-ui/` | React frontend (Vite) |

Quick start: see module READMEs.

## Spec-driven pipeline

| Doc | Purpose |
|-----|---------|
| **`docs/spec-pipeline/PIPELINE.md`** | Stage map (spec → implement → test → review → security) |
| `AGENTS.md` | Governance |
| `specs/SUPPORT-2847/` | Active work item — support ticket MVP |

```bash
bash scripts/setup-integrations.sh   # first time
./scripts/spec-bootstrap.sh <WORK-ITEM-ID>
```

Integrations: `docs/spec-pipeline/integrations/README.md` (SpecStory, OpenSpec).

## Other

- `spring-boot-aws-lambda-poc/` — Spring Boot on AWS Lambda reference
