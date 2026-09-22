#!/usr/bin/env bash
# Run a command with project-local Node/npm (.tools/node) on PATH.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$ROOT/.tools/node/bin:$ROOT/node_modules/.bin:$PATH"
if [[ ! -x "$ROOT/.tools/node/bin/npm" ]]; then
  echo "Missing $ROOT/.tools/node — run: bash scripts/setup-integrations.sh" >&2
  exit 1
fi
exec "$@"
