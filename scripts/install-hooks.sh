#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"

git config core.hooksPath .githooks
chmod +x "${repo_root}/.githooks/post-commit" "${repo_root}/.githooks/post-push"

echo "✅ Git hooks enabled via .githooks"
echo "   - post-commit: pushes commits to origin"
echo "   - post-push: deploys main branch to Vercel production"