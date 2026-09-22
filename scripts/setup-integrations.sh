#!/usr/bin/env bash
# One-time setup: portable Node/npm, OpenSpec CLI, SpecStory workspace config.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

NODE_VER="v22.14.0"
ARCH="linux-x64"
[[ "$(uname -m)" == "aarch64" ]] && ARCH="linux-arm64"
NODE_DIR="$ROOT/.tools/node"

echo "=== Integration setup (OpenSpec + SpecStory) ==="

# --- Portable Node (if system npm missing) ---
if [[ ! -x "$NODE_DIR/bin/npm" ]]; then
  echo ""
  echo "[Node] Installing portable Node $NODE_VER to .tools/node ..."
  mkdir -p .tools
  TARBALL="node-${NODE_VER}-${ARCH}.tar.xz"
  curl -fsSL "https://nodejs.org/dist/${NODE_VER}/${TARBALL}" -o ".tools/${TARBALL}"
  tar -xJf ".tools/${TARBALL}" -C .tools
  rm -f ".tools/${TARBALL}"
  mv ".tools/node-${NODE_VER}-${ARCH}" "$NODE_DIR"
fi
export PATH="$NODE_DIR/bin:$PATH"
echo "[Node] $(node --version) / npm $(npm --version)"

# --- SpecStory ---
echo ""
echo "[SpecStory]"
mkdir -p .specstory/history
if cursor --list-extensions 2>/dev/null | grep -qi specstory; then
  echo "  ✓ Extension installed: specstory.specstory-vscode"
else
  echo "  Installing SpecStory extension..."
  cursor --install-extension SpecStory.specstory-vscode
fi
echo "  ✓ .vscode/extensions.json + settings.json"
echo "  → Reload Cursor window, then send one chat message to populate .specstory/history/"

# --- OpenSpec ---
echo ""
echo "[OpenSpec]"
npm install
npm run openspec:init
npm run openspec:update || true
npx openspec --version
echo "  ✓ openspec/ + .cursor/commands/opsx-* + skills"

echo ""
echo "Done. Pipeline: ./scripts/spec-bootstrap.sh <WORK-ITEM-ID>"
echo "Docs: docs/spec-pipeline/integrations/README.md"
