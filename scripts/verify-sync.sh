#!/usr/bin/env bash
set -euo pipefail

branch_name="$(git branch --show-current)"

if [[ -z "${branch_name}" ]]; then
  echo "❌ Not on a git branch."
  exit 1
fi

git fetch origin "${branch_name}" --quiet

head_sha="$(git rev-parse HEAD)"
origin_sha="$(git rev-parse "origin/${branch_name}")"

if [[ "${head_sha}" != "${origin_sha}" ]]; then
  echo "❌ Local branch is not synced with origin/${branch_name}."
  echo "   local : ${head_sha}"
  echo "   origin: ${origin_sha}"
  echo "   Run: npm run checkpoint"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
  echo "❌ Working tree has uncommitted changes."
  echo "   Run: npm run checkpoint"
  exit 1
fi

echo "✅ Codespace and GitHub are synced on ${branch_name}."
