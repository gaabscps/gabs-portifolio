#!/usr/bin/env bash
# Run Lighthouse against the five public routes against a local production build.
# Reports are written to lighthouse-reports/ (gitignored).
# Per-route Chrome failures are logged to stderr and do not abort the rest.
#
# Usage: yarn perf:lighthouse
# Prereq: yarn build && yarn start in another shell (or set BASE_URL).

set -u

BASE_URL="${BASE_URL:-http://localhost:3000}"
OUT_DIR="lighthouse-reports"
ROUTES=("/" "/about" "/projects" "/playx1" "/banca-do-ingresso")

mkdir -p "$OUT_DIR"

for route in "${ROUTES[@]}"; do
  slug=$(echo "$route" | sed 's#/#_#g; s/^_$/root/; s/^_//')
  url="${BASE_URL}${route}"
  echo "[lighthouse] $url"
  npx --yes lighthouse "$url" \
    --quiet \
    --chrome-flags="--headless --no-sandbox" \
    --output=json \
    --output=html \
    --output-path="${OUT_DIR}/${slug}" \
    --only-categories=performance \
    || echo "[lighthouse] FAILED on $url (continuing)" >&2
done

echo "[lighthouse] done. Reports under ${OUT_DIR}/"
