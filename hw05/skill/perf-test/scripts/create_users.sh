#!/usr/bin/env bash
# Create load-test users via POST /api/register and write hw05/data/users.csv.
# Re-run after every server start: initDatabase() drops and reseeds the DB,
# so user ids change. Existing loaduser accounts are reused (login) instead
# of inserted again, because the users table has no UNIQUE constraint on email.
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
COUNT="${COUNT:-200}"
PASSWORD="${PASSWORD:-LoadUser123!}"
PREFIX="${PREFIX:-loaduser}"
DOMAIN="${DOMAIN:-eshop.com}"
WORKDIR="${WORKDIR:-$PWD}"  # thư mục làm việc của lần test (chứa data/)
OUT="${OUT:-$WORKDIR/data/users.csv}"

if ! [[ "$COUNT" =~ ^[1-9][0-9]*$ ]]; then
  echo "COUNT must be a positive integer, got: $COUNT" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
tmp="$(mktemp)"
resp="$(mktemp)"
cleanup() {
  rm -f "$tmp" "$resp"
}
trap cleanup EXIT

echo "email,password,user_id" >"$tmp"

request() {
  local method="$1"
  local path="$2"
  local body="$3"
  # http_code is global so the caller can branch on it. `local` would hide it.
  if ! http_code="$(curl -sS --max-time 10 -o "$resp" -w "%{http_code}" \
    -X "$method" "${BASE_URL}${path}" \
    -H "Content-Type: application/json" \
    -d "$body")"; then
    echo "Cannot reach ${BASE_URL}. Start the backend (node server.js) and run this script again." >&2
    exit 1
  fi
}

extract_id() {
  sed -n 's/.*"id"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p' "$resp" | head -n 1
}

created=0
reused=0

for n in $(seq 1 "$COUNT"); do
  suffix="$(printf '%03d' "$n")"
  email="${PREFIX}${suffix}@${DOMAIN}"
  name="Load User ${suffix}"
  body="$(printf '{"name":"%s","email":"%s","password":"%s"}' "$name" "$email" "$PASSWORD")"

  request POST /api/login "$body"
  if [[ "$http_code" == "200" ]]; then
    user_id="$(extract_id)"
    if [[ -z "$user_id" ]]; then
      echo "Login succeeded for ${email} but the response has no id:" >&2
      cat "$resp" >&2
      exit 1
    fi
    reused=$((reused + 1))
  elif [[ "$http_code" == "401" ]]; then
    request POST /api/register "$body"
    if [[ "$http_code" != "200" ]]; then
      echo "Register failed for ${email}: HTTP ${http_code}" >&2
      cat "$resp" >&2
      exit 1
    fi
    user_id="$(extract_id)"
    if [[ -z "$user_id" ]]; then
      echo "Register returned HTTP 200 for ${email} but the response has no id:" >&2
      cat "$resp" >&2
      exit 1
    fi
    created=$((created + 1))
  elif [[ "$http_code" == "403" ]]; then
    echo "Login for ${email} returned 403 (account locked). Restart the backend so the DB is reseeded, then run this script again." >&2
    cat "$resp" >&2
    exit 1
  else
    echo "Unexpected login status for ${email}: HTTP ${http_code}" >&2
    cat "$resp" >&2
    exit 1
  fi

  printf '%s,%s,%s\n' "$email" "$PASSWORD" "$user_id" >>"$tmp"

  if (( n % 25 == 0 || n == COUNT )); then
    echo "Progress ${n}/${COUNT} (created ${created}, reused ${reused})"
  fi
done

mv "$tmp" "$OUT"
trap - EXIT
rm -f "$resp"
echo "Wrote ${COUNT} rows to ${OUT} (created ${created}, reused ${reused})"
