#!/usr/bin/env python3
"""
Index new SpecStory session files into docs/prompt-history.md (assessment audit trail).
Run manually, via npm run specstory:index, or from Cursor sessionEnd hook.
"""
from __future__ import annotations

import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HISTORY = ROOT / ".specstory" / "history"
INDEX = ROOT / "docs" / "prompt-history.md"
MARKER = "<!-- specstory-auto-index -->"


def _existing_paths(text: str) -> set[str]:
    return set(re.findall(r"`(\.specstory/history/[^`]+)`", text))


def main() -> int:
    if not HISTORY.is_dir():
        print("{}")
        return 0

    sessions = sorted(HISTORY.glob("*.md"), key=lambda p: p.stat().st_mtime)
    if not sessions:
        print("No SpecStory sessions in .specstory/history/ yet.")
        return 0

    index_text = INDEX.read_text(encoding="utf-8") if INDEX.exists() else ""
    known = _existing_paths(index_text)
    new_rows: list[str] = []

    for path in sessions:
        rel = f".specstory/history/{path.name}"
        if rel in known:
            continue
        mtime = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
        date = mtime.strftime("%Y-%m-%d")
        new_rows.append(f"| {date} | (see file) | auto | SpecStory | `{rel}` |")

    if not new_rows:
        print("prompt-history.md already indexed.")
        return 0

    block = "\n".join(new_rows)
    if MARKER in index_text:
        index_text = index_text.replace(MARKER, block + "\n" + MARKER)
    else:
        index_text += f"\n\n## Auto-indexed SpecStory sessions\n\n{MARKER}\n{block}\n"

    INDEX.write_text(index_text, encoding="utf-8")
    print(f"Indexed {len(new_rows)} SpecStory session(s) into docs/prompt-history.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
