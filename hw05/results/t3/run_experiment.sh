#!/usr/bin/env bash
# Thí nghiệm Task 3: 5 lần baseline, 1 lần không đổi code, 2 lần backend chậm +5 ms ở checkout.
set -u
R=/Users/toanhuynh/orca/workspaces/eshop-sut/hw05-toanhuynh; E=/tmp/hw05t3/exp; S=$R/hw05/scripts/p95_regression.py
log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a $E/exp.log; }
start_backend() {  # $1 = thư mục backend
  P=$(lsof -nP -iTCP:3000 -sTCP:LISTEN -t); [ -n "$P" ] && kill $P
  until ! lsof -nP -iTCP:3000 -sTCP:LISTEN -t >/dev/null; do sleep 1; done
  (cd "$1" && nohup node server.js > $E/backend.log 2>&1 &)
  until curl -s -m 2 localhost:3000/api/products/1 | grep -q '"id"'; do sleep 1; done
  bash $R/hw05/scripts/create_users.sh >/dev/null 2>&1
  rm -rf $E/run/data; cp -R $R/hw05/data $E/run/data
}
run() {  # $1 = tên, $2 = thư mục backend
  start_backend "$2"; log "chạy $1 (backend: $2)"
  (cd $E/run && jmeter -n -t short.jmx -l $E/jtl/$1.jtl -j $E/jtl/$1.log -Jhttpclient.reset_state_on_thread_group_iteration=false >/dev/null 2>&1)
  log "xong $1: $(($(wc -l < $E/jtl/$1.jtl)-1)) sample"
}
: > $E/exp.log
log "máy: $(hostname)"
for i in 1 2 3 4 5; do run base_$i $R/backend; done
python3 -I $S baseline $E/jtl/base_{1,2,3,4,5}.jtl -o $E/baseline_pr.json --tier pr --machine macbook-air-m5 | tee -a $E/exp.log
run unchanged $R/backend
python3 -I $S check --baseline $E/baseline_pr.json --jtl $E/jtl/unchanged.jtl --tier pr --machine macbook-air-m5 > $E/check_unchanged.txt 2>&1; echo $? > $E/check_unchanged.exit
log "check unchanged exit=$(cat $E/check_unchanged.exit)"
run slow_1 $E/slow
python3 -I $S check --baseline $E/baseline_pr.json --jtl $E/jtl/slow_1.jtl --tier pr --machine macbook-air-m5 > $E/check_slow_1.txt 2>&1; echo $? > $E/check_slow_1.exit
log "check slow_1 exit=$(cat $E/check_slow_1.exit)"
run slow_2 $E/slow
python3 -I $S check --baseline $E/baseline_pr.json --jtl $E/jtl/slow_2.jtl --tier pr --machine macbook-air-m5 --confirm > $E/check_slow_2_confirm.txt 2>&1; echo $? > $E/check_slow_2_confirm.exit
log "check slow_2 --confirm exit=$(cat $E/check_slow_2_confirm.exit)"
start_backend $R/backend; log "khôi phục backend gốc. XONG"
