#!/usr/bin/env bash
set -euo pipefail

interval_minutes="${1:-20}"

if ! [[ "${interval_minutes}" =~ ^[0-9]+$ ]]; then
  echo "Usage: bash scripts/checkpoint-watch.sh <minutes>"
  exit 1
fi

echo "Auto-checkpoint running every ${interval_minutes} minute(s). Press Ctrl+C to stop."

while true; do
  bash "$(dirname "$0")/checkpoint.sh" || true
  sleep "$((interval_minutes * 60))"
done