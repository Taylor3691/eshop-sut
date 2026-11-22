#!/usr/bin/env bash
# Đưa SUT về trạng thái sạch trước MỖI lần chạy JMeter:
#   dừng process đang nghe cổng -> khởi động lại backend -> chờ health check -> tạo dữ liệu test.
# Với EShop, khởi động lại là đủ để reset lockout, đơn hàng, coupon_usage và giỏ hàng trong RAM,
# vì initDatabase() xóa và seed lại DB mỗi lần process khởi động.
#
# Biến môi trường (có mặc định cho EShop):
#   BACKEND_DIR  thư mục backend           (mặc định: <repo>/backend)
#   START_CMD    lệnh khởi động            (mặc định: node server.js)
#   PORT         cổng                      (mặc định: 3000)
#   HEALTH_URL   URL kiểm tra sẵn sàng     (mặc định: http://localhost:$PORT/api/products/1)
#   SEED_CMD     lệnh tạo dữ liệu test     (mặc định: bash <skill>/scripts/create_users.sh)
#   LOG          file log backend          (mặc định: /tmp/perf_backend.log)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(git -C "$HERE" rev-parse --show-toplevel 2>/dev/null || pwd)"
BACKEND_DIR="${BACKEND_DIR:-$REPO/backend}"
START_CMD="${START_CMD:-node server.js}"
PORT="${PORT:-3000}"
HEALTH_URL="${HEALTH_URL:-http://localhost:$PORT/api/products/1}"
SEED_CMD="${SEED_CMD:-bash $HERE/create_users.sh}"
LOG="${LOG:-/tmp/perf_backend.log}"

PIDS="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null || true)"
if [[ -n "$PIDS" ]]; then
  echo "Dừng process cổng $PORT: $PIDS"
  kill $PIDS
  for _ in $(seq 1 30); do lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1 || break; sleep 1; done
fi
echo "Khởi động: (cd $BACKEND_DIR && $START_CMD) > $LOG"
# exec: subshell trở thành chính process backend, không giữ stdout của script (tránh treo khi bị pipe)
( cd "$BACKEND_DIR" && exec nohup $START_CMD ) > "$LOG" 2>&1 < /dev/null &
for _ in $(seq 1 60); do
  if curl -s -m 2 -o /dev/null -w '%{http_code}' "$HEALTH_URL" | grep -q '^2'; then break; fi
  sleep 1
done
curl -s -m 2 -o /dev/null "$HEALTH_URL" || { echo "Backend không sẵn sàng, xem $LOG" >&2; exit 1; }
echo "Backend sẵn sàng. PID $(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t | head -1)"
if [[ -n "$SEED_CMD" ]]; then echo "Tạo dữ liệu: $SEED_CMD"; eval "$SEED_CMD"; fi
