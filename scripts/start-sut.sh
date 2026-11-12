#!/bin/bash
# Khởi chạy EShop SUT cho HW03: backend :3000, web :5173, admin :5174.
# Lưu ý: backend tạo lại database (DROP + seed) mỗi lần khởi động => restart = reset dữ liệu.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/logs"
for p in 3000 5173 5174; do lsof -ti tcp:$p | xargs kill 2>/dev/null; done
(cd "$ROOT/backend"        && node server.js   > "$ROOT/logs/backend.log" 2>&1 &)
(cd "$ROOT/frontend-web"   && npm run dev -- --port 5173 --strictPort > "$ROOT/logs/web.log"   2>&1 &)
(cd "$ROOT/frontend-admin" && npm run dev -- --port 5174 --strictPort > "$ROOT/logs/admin.log" 2>&1 &)
echo "Đang khởi động... đợi 5s"; sleep 5
for u in http://localhost:3000/api/products http://localhost:5173 http://localhost:5174; do
  printf "%-36s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' $u)"
done
