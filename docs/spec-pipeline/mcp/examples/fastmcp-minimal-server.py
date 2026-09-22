#!/usr/bin/env python3
"""
Reference minimal MCP server (FastMCP-style) for certification demo.
NOT production — read-only helpers over specs/ folder.

Install (local dev only): pip install mcp fastmcp
Run: python3 docs/spec-pipeline/mcp/examples/fastmcp-minimal-server.py

Configure in Cursor MCP with stdio pointing to this script.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

try:
    from mcp.server.fastmcp import FastMCP
except ImportError as e:
    raise SystemExit(
        "Install MCP SDK: pip install mcp fastmcp\n" + str(e)
    ) from e

ROOT = Path(__file__).resolve().parents[4]  # repo root
SPECS = ROOT / "specs"

mcp = FastMCP("spec-pipeline-tools")


@mcp.tool()
def get_spec_manifest(ticket_id: str) -> str:
    """Return spec-manifest.json for a work item."""
    path = SPECS / ticket_id / "spec-manifest.json"
    if not path.is_file():
        return json.dumps({"error": "not_found", "path": str(path)})
    return path.read_text(encoding="utf-8")


@mcp.tool()
def list_pending_tasks(ticket_id: str) -> str:
    """List T-### task ids still marked pending in tasks.md."""
    path = SPECS / ticket_id / "tasks.md"
    if not path.is_file():
        return json.dumps({"error": "not_found"})
    pending = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if re.search(r"\|\s*T-\d{3}\s*\|", line) and "pending" in line.lower():
            m = re.search(r"T-\d{3}", line)
            if m:
                pending.append(m.group(0))
    return json.dumps({"ticketId": ticket_id, "pending": pending})


@mcp.tool()
def validate_task_schema(ticket_id: str) -> str:
    """Validate tasks.json against task-list.schema.json if present."""
    tasks_path = SPECS / ticket_id / "tasks.json"
    schema_path = (
        ROOT
        / "docs/spec-pipeline/prompt-engineering/schemas/task-list.schema.json"
    )
    if not tasks_path.is_file():
        return json.dumps({"valid": False, "reason": "tasks.json missing"})
    try:
        import jsonschema  # optional: pip install jsonschema
    except ImportError:
        return json.dumps({"valid": None, "reason": "jsonschema not installed"})
    data = json.loads(tasks_path.read_text(encoding="utf-8"))
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    jsonschema.validate(data, schema)
    return json.dumps({"valid": True})


if __name__ == "__main__":
    mcp.run()
