#!/usr/bin/env python3
"""sessionEnd hook: index SpecStory sessions into docs/prompt-history.md"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INDEX_SCRIPT = ROOT / "scripts" / "specstory-index.py"

def main() -> int:
    if INDEX_SCRIPT.is_file():
        subprocess.run(
            [sys.executable, str(INDEX_SCRIPT)],
            cwd=str(ROOT),
            capture_output=True,
            text=True,
        )
    print("{}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
