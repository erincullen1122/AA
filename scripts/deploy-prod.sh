#!/usr/bin/env bash
set -euo pipefail

scope="anniehall16-1319s-projects"

echo "==> Creating checkpoint"
bash "$(dirname "$0")/checkpoint.sh"

echo "==> Verifying GitHub/Codespaces sync"
bash "$(dirname "$0")/verify-sync.sh"

echo "==> Running production build check"
npm run check

echo "==> Deploying to Vercel production"
deploy_output="$(npx vercel --prod --yes --scope "${scope}")"
echo "${deploy_output}"

deploy_url="$(echo "${deploy_output}" | grep -Eo 'https://[^ ]+\.vercel\.app' | tail -n 1 || true)"

if [[ -n "${deploy_url}" ]]; then
  npx vercel alias set "${deploy_url}" huggers.womensaa.vercel.app --scope "${scope}"
  echo "✅ Production deploy completed: ${deploy_url}"
else
  echo "⚠️ Deploy completed, but could not parse deployment URL from output."
fi

echo "==> Final sync check"
bash "$(dirname "$0")/verify-sync.sh"
