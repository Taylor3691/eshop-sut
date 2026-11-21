#!/usr/bin/env bash
# Chạy thử nhanh 3 test plan với tải rất nhỏ trước khi chạy thật.
# Không sửa file .jmx gốc: tạo bản rút gọn trong thư mục tạm rồi chạy bản đó.
#
# Dùng:  bash hw05/scripts/smoke_test.sh            # chạy cả 3
#        bash hw05/scripts/smoke_test.sh load       # chỉ chạy 1 plan (load | stress | spike)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE_URL="${BASE_URL:-http://localhost:3000}"
WORK="$(mktemp -d /tmp/hw05_smoke.XXXXXX)"
ONLY="${1:-all}"

# 1. Kiểm tra backend và tài khoản test
if ! curl -s -m 3 -o /dev/null "$BASE_URL/api/products/1"; then
  echo "Backend chưa chạy ở $BASE_URL. Chạy: cd backend && node server.js" >&2
  exit 1
fi
first_user="$(sed -n 2p "$ROOT/data/users.csv")"
email="${first_user%%,*}"; rest="${first_user#*,}"; password="${rest%%,*}"
code="$(curl -s -m 3 -o /dev/null -w '%{http_code}' -X POST "$BASE_URL/api/login" \
  -H 'Content-Type: application/json' -d "{\"email\":\"$email\",\"password\":\"$password\"}")"
if [[ "$code" != "200" ]]; then
  echo "Login $email trả $code. Chạy lại: bash hw05/scripts/create_users.sh" >&2
  exit 1
fi

cp -r "$ROOT/data" "$WORK/"

# 2. Tạo bản rút gọn
python3 -I - "$ROOT" "$WORK" <<'PY'
import re, sys
root, work = sys.argv[1], sys.argv[2]
def sub(s, old, new):
    assert old in s, old
    return s.replace(old, new)
s = open(f"{root}/23120175_Load_20261121.jmx", encoding="utf-8").read()
s = sub(s, '"ThreadGroup.num_threads">30<', '"ThreadGroup.num_threads">3<')
s = sub(s, '"ThreadGroup.ramp_time">60<', '"ThreadGroup.ramp_time">3<')
s = sub(s, '"ThreadGroup.duration">600<', '"ThreadGroup.duration">30<')
open(f"{work}/load.jmx", "w", encoding="utf-8").write(s)

s = open(f"{root}/23120175_Stress_20261121.jmx", encoding="utf-8").read()
for a, b in [('"ThreadGroup.num_threads">200<', '"ThreadGroup.num_threads">6<'),
             ('"Start users count">20<', '"Start users count">2<'),
             ('"Start users period">25<', '"Start users period">5<'),
             ('"flighttime">60<', '"flighttime">10<'),
             ('"rampUp">5<', '"rampUp">2<'),
             ('"Stop users count">50<', '"Stop users count">6<'),
             ('"Stop users period">5<', '"Stop users period">1<')]:
    s = sub(s, a, b)
open(f"{work}/stress.jmx", "w", encoding="utf-8").write(s)

s = open(f"{root}/23120175_Spike_20261121.jmx", encoding="utf-8").read()
m = re.search(r'<collectionProp name="ultimatethreadgroupdata">.*?</collectionProp>\s*</collectionProp>', s, re.S)
assert m
def row(i, vals):
    return f'<collectionProp name="{i}">' + "".join(f'<stringProp name="{k}">{v}</stringProp>' for k, v in enumerate(vals)) + '</collectionProp>'
# baseline 2 thread trong 40s; spike +6 thread ở giây 10, giữ 10s
new = '<collectionProp name="ultimatethreadgroupdata">' + row(0, [2, 0, 2, 40, 2]) + row(1, [6, 10, 2, 10, 2]) + '</collectionProp>'
s = s[:m.start()] + new + s[m.end():]
open(f"{work}/spike.jmx", "w", encoding="utf-8").write(s)
PY

# 3. Chạy và tóm tắt
run() {
  local name="$1"
  echo; echo "=== $name ==="
  (cd "$WORK" && jmeter -n -t "$name.jmx" -l "$name.jtl" -j "$name.log" -Jhttpclient.reset_state_on_thread_group_iteration=false | grep -E "summary =|Err:" | tail -1)
  python3 -I - "$WORK/$name.jtl" <<'PY'
import csv, sys, collections
rows = list(csv.DictReader(open(sys.argv[1], encoding="utf-8")))
if not rows:
    print("  Không có sample nào. Xem log:", sys.argv[1].replace(".jtl", ".log")); sys.exit()
c = collections.Counter((r["label"], r["responseCode"], r["success"]) for r in rows)
print(f"  {'label':42} {'code':5} {'ok':5} count")
for (l, code, ok), n in sorted(c.items()):
    print(f"  {l:42} {code:5} {ok:5} {n}")
fails = [r for r in rows if r["success"] == "false"]
seen = set()
for r in fails:
    k = (r["label"], r["failureMessage"][:100])
    if k not in seen:
        seen.add(k); print(f"  FAIL {r['label']}: {r['failureMessage'][:100] or r['responseMessage']}")
PY
}

case "$ONLY" in
  all) run load; run stress; run spike ;;
  load|stress|spike) run "$ONLY" ;;
  *) echo "Tham số phải là: load | stress | spike" >&2; exit 1 ;;
esac

echo; echo "File kết quả chạy thử: $WORK (không phải kết quả để nộp)"
echo "Kỳ vọng: LOCK_04 failed (403, bug lockout); các sampler khác ok=true."
echo "Nhớ khởi động lại backend + chạy create_users.sh trước khi chạy thật."
