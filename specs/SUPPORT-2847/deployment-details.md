# Deployment — SUPPORT-2847

**Feature branch:** `spec/SUPPORT-2847/stage-02-agent2`  
**Parent branch:** `main`  
**Work item:** SUPPORT-2847

## Services

| Service | Port | Artifact |
|---------|------|----------|
| support-ticket-service | 8080 | `mvn package` → executable JAR |
| support-ticket-ui | 5173 (dev) | `npm run build` → `dist/` |

## Deploy order

1. Provision PostgreSQL (production) or use bundled H2 file (development only).
2. Deploy API with `JAVA_HOME` pointing to JDK 21.
3. Serve UI static assets from CDN/nginx or embed in API static resources.
4. Configure CORS `app.cors.allowed-origins` for production UI origin.

## Environment variables (production)

| Variable | Purpose |
|----------|---------|
| `SPRING_DATASOURCE_URL` | JDBC URL (PostgreSQL) |
| `SPRING_DATASOURCE_USERNAME` | DB user |
| `SPRING_DATASOURCE_PASSWORD` | DB password (secret store) |

## Rollback

1. Revert to previous JAR / container image.
2. Database: `ddl-auto=update` — review schema migrations before rollback; prefer explicit migrations in production.

## Local verification

```bash
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
mvn -f support-ticket-service/pom.xml test
cd support-ticket-ui && npm run build
```
