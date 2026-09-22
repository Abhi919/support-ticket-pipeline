# Support ticket platform

Internal support ticket management with a spec-driven delivery pipeline.

## Quick start

**Prerequisites:** Java 21, Maven 3.9+, Node.js 18+

```bash
git clone https://github.com/Abhi919/support-ticket-pipeline.git
cd support-ticket-pipeline
```

### 1. Start the API (terminal 1)

```bash
cd support-ticket-service
mvn spring-boot:run
```

API: http://localhost:8080/api/tickets  
Data is stored in an H2 file under `support-ticket-service/data/` (survives restarts).

### 2. Start the UI (terminal 2)

```bash
cd support-ticket-ui
npm install
npm run dev
```

UI: http://localhost:5173  
Vite proxies `/api` to the backend on port 8080.

### 3. Use the app

1. Open http://localhost:5173
2. Create a ticket via **New ticket**
3. Open a ticket to edit fields, add comments, and change status

If port 8080 is already in use, run the API on another port and point the UI at it:

```bash
# API
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081

# UI
VITE_API_TARGET=http://localhost:8081 npm run dev
```

### Run tests

```bash
cd support-ticket-service
mvn test
```

## Applications

| Path | Description |
|------|-------------|
| `support-ticket-service/` | Java 21 Spring Boot REST API |
| `support-ticket-ui/` | React frontend (Vite) |

More detail: module READMEs in each folder.

## Spec-driven pipeline

| Doc | Purpose |
|-----|---------|
| **`docs/spec-pipeline/PIPELINE.md`** | Stage map (spec → implement → test → review → security) |
| `AGENTS.md` | Governance |
| `specs/SUPPORT-2847/` | Active work item — support ticket MVP |

```bash
bash scripts/setup-integrations.sh   # first time (SpecStory / OpenSpec)
./scripts/spec-bootstrap.sh <WORK-ITEM-ID>
```

Integrations: `docs/spec-pipeline/integrations/README.md` (SpecStory, OpenSpec).

## Other

- `spring-boot-aws-lambda-poc/` — Spring Boot on AWS Lambda reference
