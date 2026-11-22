#!/usr/bin/env bash
# Đóng gói bài nộp Moodle (giới hạn 20 MB) từ thư mục hw05, không sửa file trong repo.
#   bash hw05/report/build_zip.sh [đường-dẫn-stress.jtl.xz] [thư-mục-đích]
# Phần quá lớn (Soak .jtl/report/ảnh, .jtl Task 3, .jtl và report của demo skill) để trên GitHub, xem README.
set -euo pipefail
HW="$(cd "$(dirname "$0")/.." && pwd)"
NAME="23120175_HW05_AI_Performance_098"
XZ="${1:-/tmp/hw05zip/stress.jtl.xz}"
OUTDIR="${2:-$HOME/Desktop}"
STAGE="$(mktemp -d /tmp/hw05stage.XXXXXX)/$NAME"
mkdir -p "$STAGE"
cd "$HW"

[[ -f "$XZ" ]] || { echo "Thiếu $XZ. Tạo bằng: xz -9e -T0 -k -c results/stress.jtl > $XZ" >&2; exit 1; }

# 1. Tài liệu, test plan, dữ liệu, script, skill
cp README.md REPORT.md REPORT.pdf AI_CRITIQUE.md AI_CRITIQUE.pdf AILOG.md AILOG.pdf git_log.txt \
   BUG_REPORTS.md REVIEW_TESTPLANS.md REPORT_TASK1.md REPORT_TASK2.md REPORT_TASK3.md REVIEW_TASK3.md \
   T3_EXPERIMENT.md SOAK_RESULT.md PERF_PIPELINE_FLOW.md 23120175_*_20261121.jmx "$STAGE/"
cp -R data scripts ci skill report "$STAGE/"

# 2. Kết quả: 3 file .jtl bắt buộc (stress dạng .xz), RAM của Soak, phần nhỏ của Task 3
mkdir -p "$STAGE/results/t3"
cp results/load.jtl results/spike.jtl results/soak_node_rss.csv "$STAGE/results/"
cp "$XZ" "$STAGE/results/stress.jtl.xz"
cp results/t3/run_experiment.sh results/t3/slow_checkout.patch "$STAGE/results/t3/"
for r in run1 run2; do
  mkdir -p "$STAGE/results/t3/$r"
  cp results/t3/$r/baseline_pr.json results/t3/$r/check_*.txt results/t3/$r/exp.log "$STAGE/results/t3/$r/"
done

# 3. Báo cáo HTML của 3 kịch bản bắt buộc
mkdir -p "$STAGE/reports"
cp -R reports/load reports/stress reports/spike "$STAGE/reports/"

# 4. Demo skill: plan, CSV, phân tích (không gồm .jtl và report HTML)
mkdir -p "$STAGE/skill-demo/search"
(cd skill-demo/search && cp *.md *.jmx "$STAGE/skill-demo/search/" && cp -R data "$STAGE/skill-demo/search/")

# 5. Ảnh: JPEG chất lượng 70, cạnh dài tối đa 1800 px (trừ ảnh Soak, để trên GitHub)
find evidence -type f ! -path 'evidence/soak/*' | while read -r f; do
  d="$STAGE/$(dirname "$f")"; mkdir -p "$d"
  case "$f" in
    *.png|*.jpg) sips -s format jpeg -s formatOptions 70 -Z 1800 "$f" --out "$d/$(basename "${f%.*}").jpg" >/dev/null ;;
    *) cp "$f" "$d/" ;;
  esac
done

# 6. Sửa liên kết ảnh .png -> .jpg trong các file .md của bản sao
find "$STAGE" -name '*.md' -print0 | xargs -0 perl -pi -e 's#(evidence/[^\s)`"]+?)\.png#$1.jpg#g'
# Phần để ngoài zip: trỏ thẳng lên GitHub; stress.jtl trong zip là bản .xz
G="https://github.com/Taylor3691/eshop-sut"; B="hw05/toanhuynh/hw05"
find "$STAGE" -name '*.md' -print0 | xargs -0 perl -pi -e "
  s#\\]\\(results/stress\\.jtl\\.gz\\)#](results/stress.jtl.xz)#g;
  s#\\]\\(results/soak\\.jtl\\.gz\\)#]($G/blob/$B/results/soak.jtl.gz)#g;
  s#\\]\\(reports/soak/\\)#]($G/tree/$B/reports/soak)#g;
  s#\\]\\(evidence/soak/\\)#]($G/tree/$B/evidence/soak)#g;"


# 7. Bỏ file không nộp
find "$STAGE" \( -name '.DS_Store' -o -name 'jmeter.log' \) -delete

# 8. Nén
mkdir -p "$OUTDIR"
rm -f "$OUTDIR/$NAME.zip"
(cd "$(dirname "$STAGE")" && zip -qr -9 "$OUTDIR/$NAME.zip" "$NAME")
SIZE=$(stat -f %z "$OUTDIR/$NAME.zip")
echo "Đã tạo $OUTDIR/$NAME.zip: $(echo "$SIZE" | awk '{printf "%.2f MB", $1/1048576}') ($(cd "$(dirname "$STAGE")" && find "$NAME" -type f | wc -l | tr -d ' ') file)"
[[ "$SIZE" -lt 20971520 ]] && echo "OK: dưới 20 MB" || echo "VƯỢT 20 MB"
echo "Bản sao để kiểm tra: $STAGE"
