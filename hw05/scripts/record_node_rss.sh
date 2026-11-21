#!/usr/bin/env bash
# Sample the Node process RSS every 5 seconds while a soak run is writing
# hw05/results/soak.jtl. Stop on Ctrl+C, if that JTL stops growing, or if
# the Node process exits.
# macOS ps reports rss in kilobytes.
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
JTL="${JTL:-$ROOT/results/soak.jtl}"
OUT="${OUT:-$ROOT/results/soak_node_rss.csv}"
INTERVAL="${INTERVAL:-5}"
# Three unchanged polls = 15s with the default interval. JMeter flushes
# the JTL often enough that a quiet file means the test has finished.
QUIET_POLLS="${QUIET_POLLS:-3}"

mkdir -p "$(dirname "$OUT")"

PID="$(lsof -nP -iTCP:3000 -sTCP:LISTEN -t 2>/dev/null | head -n 1 || true)"
if [[ -z "$PID" ]]; then
  echo "No process is listening on port 3000." >&2
  exit 1
fi

echo "epoch_ms,rss_kb" >"$OUT"
echo "Watching node pid $PID"
echo "JTL $JTL"
echo "Writing $OUT every ${INTERVAL}s. Ctrl+C to stop."

stop_reason=""
trap 'stop_reason="Ctrl+C"' INT

seen=0
unchanged=0
last_size=-1

while [[ -z "$stop_reason" ]]; do
  rss="$(ps -o rss= -p "$PID" 2>/dev/null | tr -d ' ' || true)"
  if [[ -z "$rss" ]]; then
    stop_reason="process $PID ended"
    break
  fi

  epoch_ms="$(python3 -c 'import time; print(int(time.time() * 1000))')"
  echo "${epoch_ms},${rss}" >>"$OUT"
  echo "$(date +%H:%M:%S) rss_kb=${rss}"

  if [[ -f "$JTL" ]]; then
    size="$(stat -f %z "$JTL")"
    if [[ "$seen" -eq 1 && "$size" -eq "$last_size" ]]; then
      unchanged=$((unchanged + 1))
      if [[ "$unchanged" -ge "$QUIET_POLLS" ]]; then
        stop_reason="soak.jtl unchanged for $((QUIET_POLLS * INTERVAL))s"
        break
      fi
    else
      unchanged=0
      if [[ "$size" -gt 0 ]]; then
        seen=1
      fi
    fi
    last_size="$size"
  fi

  sleep "$INTERVAL" || true
done

echo "Stopped: ${stop_reason:-finished}"
echo "Rows: $(($(wc -l <"$OUT") - 1)) in $OUT"
