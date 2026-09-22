# MCP — pipeline integrations (stage 0–5)

> Part of the **unified pipeline** — see `../PIPELINE.md`.

## When each stage uses MCP

| Stage | MCP use |
|-------|---------|
| 0 Bootstrap | Optional: validate work item exists (Jira) |
| 1 Specification | **Jira MCP** — fetch summary, description, AC, comments |
| 2 Implement | Optional: GitHub — branch/PR; spec helper tools |
| 3 Testing | Optional: run test commands via shell MCP |
| 4–5 Review | Optional: GitHub PR diff, security scanners |

## Consuming MCP in Cursor

1. Cursor Settings → MCP (or project MCP config).
2. Credentials via environment variables only.
3. Debug failures: `debugging-tool-calls.md`.

## Minimal server example

`examples/fastmcp-minimal-server.py` — read-only helpers over `specs/` (manifest, pending tasks, schema validate). Optional; not required for the pipeline to run.

## Authoring a minimal MCP server (2–3 domain tools)

### Spring AI `@Tool` (Java)

```java
@Component
public class SpecTools {
  @Tool(description = "List open tasks for a work item spec folder")
  public String listPendingTasks(String ticketId) { /* read specs/<id>/tasks.md */ }
}
```

### FastMCP (Python)

Reference: `examples/fastmcp-minimal-server.py` — `get_spec_manifest`, `list_pending_tasks`, `validate_task_schema`.

## Security

Scope tools narrowly. No production secrets in config. Log debugging in `docs/prompt-history.md` (redact tokens).
