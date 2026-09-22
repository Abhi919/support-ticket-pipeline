#!/usr/bin/env python3
"""
Cursor postToolUse hook: after milestone spec files are written, inject pipeline + MR guidance.

Reads JSON from stdin; prints JSON to stdout: {} or {"additional_context": "..."}.
"""
from __future__ import annotations

import json
import re
import sys
from typing import Any, Optional


def _extract_path(payload: Any) -> Optional[str]:
    if not isinstance(payload, dict):
        return None

    direct = payload.get("path")
    if isinstance(direct, str):
        return direct

    for key in ("tool_input", "toolInput", "arguments", "input", "tool_arguments"):
        node = payload.get(key)
        if isinstance(node, dict):
            p = node.get("path") or node.get("file_path") or node.get("target_file")
            if isinstance(p, str):
                return p

    for v in payload.values():
        if isinstance(v, dict):
            p = v.get("path")
            if isinstance(p, str):
                return p
    return None


def _ticket_from_specs_path(path: str) -> Optional[str]:
    m = re.match(r".*/specs/([^/]+)/([^/]+)$", path.replace("\\", "/"))
    if not m:
        return None
    return m.group(1)


def _message_for_file(path: str) -> Optional[str]:
    norm = path.replace("\\", "/")
    if "/specs/" not in norm:
        return None

    ticket = _ticket_from_specs_path(norm)
    if not ticket:
        return None

    name = norm.rsplit("/", 1)[-1]

    common_header = (
        f"Unified pipeline ({ticket}): milestone `{name}` updated.\n\n"
        "Follow `docs/spec-pipeline/PIPELINE.md` for the next stage. "
        "**MR gate required** before advancing — update `spec-manifest.json` after approval.\n\n"
    )

    if name == "requirements.md":
        return (
            f"Unified pipeline ({ticket}): stage 1 in progress — `requirements.md` updated.\n\n"
            "Complete remaining spec artifacts, then `test-strategy.md` (stage 1 milestone). "
            "See `docs/spec-pipeline/PIPELINE.md` stage 1. No code until MR gate 01.\n"
        )

    if name == "test-strategy.md":
        return (
            f"Unified pipeline ({ticket}): stage 1 spec files nearly complete.\n\n"
            "**Next: Agent 1b** — `prompts/agent-1b-stakeholder-approach.md` → `approach-document.html`.\n"
            "Then MR gate 01 (spec + approach HTML). No code until MR 01 approved.\n"
        )

    if name == "approach-document.html":
        return (
            common_header
            + "**Stages 1 + 1b complete.** Run `.cursor/commands/review-spec.md` + review approach HTML.\n"
            + f"MR gate 01: `specs/{ticket}/mr-gate-01-agent1.md` → **stage 2** (implementation).\n"
            + "Set `stages.agent1` and `stages.agent1b` → `approved` after merge.\n"
        )

    if name == "implementation-notes.md":
        return (
            common_header
            + "**Stage 2 code in progress or updated.** When all `T-###` done → **Agent 2b** "
            + "(`prompts/agent-2b-implementation-docs.md`) → then **Agent 2c** functional verify.\n"
            + "Do not start test cases until 2c reports **pass**.\n"
        )

    if name == "technical-documentation.html":
        return (
            common_header
            + "**Agent 2b milestone.** Ensure `deployment-details.md` is complete, then run **Agent 2c** "
            + f"— `prompts/agent-2c-functional-verification.md` or `.cursor/commands/verify-functional-completeness.md`.\n"
        )

    if name == "deployment-details.md":
        return (
            common_header
            + "**Agent 2b:** deployment details updated. Run **Agent 2c** if not done — verify all `FUN-###` in code.\n"
        )

    if name == "functional-completeness-report.md":
        return (
            common_header
            + "**Agent 2c complete.** If overall result is **pass** → MR gate 02 → **stage 3 (testing)**.\n"
            + "If **fail** → return to Agent 2; do not write test cases.\n"
            + f"MR: `specs/{ticket}/mr-gate-02-agent2.md`\n"
        )

    if name == "test-cases.md":
        return (
            common_header
            + "**Stage 3 milestone.** After MR gate 03 → **stage 4 (review)** — `PIPELINE.md`.\n"
            + f"MR: `specs/{ticket}/mr-gate-03-agent3.md` · `stages.agent3.status` → `approved`.\n"
        )

    if name == "review-report.md":
        return (
            common_header
            + "**Stage 4 milestone.** Fix loop → stage 2 if blockers. After MR gate 04 → **stage 5 (security)**.\n"
            + f"MR: `specs/{ticket}/mr-gate-04-agent4.md` · `stages.agent4.status` → `approved`.\n"
        )

    if name == "security-audit.md":
        return (
            common_header
            + "**Stage 5 milestone.** After MR gate 05 → `final-summary.md`, `stages.final.status` → `ready_for_merge`.\n"
            + f"MR: `specs/{ticket}/mr-gate-05-agent5.md` · `stages.agent5.status` → `approved`.\n"
        )

    return None


def main() -> int:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        print("{}")
        return 0

    path = _extract_path(data)
    if not path:
        print("{}")
        return 0

    msg = _message_for_file(path)
    if not msg:
        print("{}")
        return 0

    print(json.dumps({"additional_context": msg}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
