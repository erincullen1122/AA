#!/usr/bin/env bash
set -euo pipefail

branch_name="$(git branch --show-current)"

if [[ -z "${branch_name}" ]]; then
  echo "Not on a git branch."
  exit 1
fi

if git diff --quiet && git diff --cached --quiet && [[ -z "$(git ls-files --others --exclude-standard)" ]]; then
  echo "No changes to checkpoint."
  exit 0
fi

git add -A

if git diff --cached --quiet; then
  echo "No staged changes after add."
  exit 0
fi

timestamp="$(date '+%Y-%m-%d %H:%M')"
git commit -m "checkpoint: ${timestamp}"

if git rev-parse --abbrev-ref --symbolic-full-name "@{u}" >/dev/null 2>&1; then
  git push
else
  git push -u origin "${branch_name}"
fi

echo "Checkpoint pushed on ${branch_name}."