# Debugging MCP tool calls

## 1. Confirm the server is running

- Cursor **MCP** panel: server status green
- For stdio servers: check `command` path and `args` in MCP config
- Restart Cursor after config changes

## 2. Inspect request / response

- Use Cursor **Hooks** output or MCP logs (if enabled)
- Temporarily add logging in your server handler (stderr, not committed secrets)
- Reproduce with a **minimal** tool call (single required field)

## 3. Schema mismatches

| Symptom | Likely cause |
|---------|----------------|
| `required property X missing` | Client omitted a required JSON field |
| `type string expected` | Number passed where tool schema expects string |
| Tool not found | Wrong server or outdated tool list — restart MCP |

**Fix:** Align client arguments with the tool's `inputSchema`. Regenerate tool definitions after changing `@Tool` method signatures.

## 4. Auth and network

- 401/403 → env vars (`JIRA_API_TOKEN`, `GITHUB_TOKEN`, …)
- Timeout → network, VPN, or wrong base URL
- Rate limit → backoff; narrow Jira fields requested

## 5. Pipeline-specific checks

| Goal | Tool / action |
|------|----------------|
| Validate task JSON | `validate_task_schema` (example server) |
| Read manifest stage | `get_spec_manifest` |
| Fetch Jira AC | Jira MCP `get_issue` with description + custom fields |

## 6. Document the incident

Add a row to `docs/ai-mistakes-log.md` if the agent misused a tool or misread a response.
