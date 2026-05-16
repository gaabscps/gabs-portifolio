#!/usr/bin/env bash
# Fail the CI if `yarn audit` reports any HIGH or CRITICAL advisory that
# is NOT in the known/accepted allowlist below.
#
# Yarn 1's `yarn audit` exits non-zero whenever it finds anything, so we
# capture the JSON output, filter it, and decide ourselves.

set -uo pipefail

cd "$(dirname "$0")/../.."

# --- Allowlist ---------------------------------------------------------------
# Known advisories we have accepted for now. Each entry must link to the
# issue or PR that explains why. Remove entries here as soon as the upstream
# fix lands.
#
# Tracked in: https://github.com/gaabscps/gabs-portifolio/issues/22
# (all 14 are in `next@14.2.x` and only fixed in `next@15.5.x`)
ALLOWLIST=(
  GHSA-9g9p-9gw9-jx7f
  GHSA-3x4c-7xq6-9pq8
  GHSA-h64f-5h5j-jqjh
  GHSA-36qx-fr4f-26g5
  GHSA-3g8h-86w9-wvmq
  GHSA-h25m-26qc-wcjf
  GHSA-q4gf-8mx6-v5v3
  GHSA-8h8q-6873-q5fj
  GHSA-gx5p-jg67-6x7h
  GHSA-ffhc-5mcf-pf4q
  GHSA-c4j6-fc7j-m34r
  GHSA-vfv6-92ff-j949
  GHSA-wfc6-r584-vfw7
  GHSA-ggv3-7p47-pfv8
)

ALLOW_REGEX="$(IFS='|'; echo "${ALLOWLIST[*]}")"

# --- Run audit ---------------------------------------------------------------
AUDIT_JSON="$(mktemp)"
trap 'rm -f "$AUDIT_JSON"' EXIT

yarn audit --json > "$AUDIT_JSON" || true

# --- Filter ------------------------------------------------------------------
# Pick high + critical advisories, dedupe by GHSA id, drop allowlisted ones.
NEW="$(
  jq -r '
    select(.type == "auditAdvisory")
    | .data.advisory
    | select(.severity == "high" or .severity == "critical")
    | "\(.severity)\t\(.github_advisory_id)\t\(.module_name)\t\(.title)"
  ' "$AUDIT_JSON" \
  | sort -u \
  | grep -vE "	($ALLOW_REGEX)	" || true
)"

# --- Report ------------------------------------------------------------------
echo "=== yarn audit summary ==="
yarn audit --summary 2>&1 | tail -3 || true
echo
echo "=== Allowlisted advisories (kept passing) ==="
printf '%s\n' "${ALLOWLIST[@]}"
echo

if [[ -z "$NEW" ]]; then
  echo "✅ No new high or critical advisories outside the allowlist."
  exit 0
fi

echo "❌ Found high/critical advisories that are NOT in the allowlist:"
echo
printf '%s\n' "$NEW" | column -t -s $'\t'
echo
echo "Fix them, or — if you have reviewed the risk and want to defer —"
echo "add the GHSA id to ALLOWLIST in .github/scripts/audit.sh with a"
echo "link to the issue tracking it."
exit 1
