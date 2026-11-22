#!/usr/bin/env bash
# Xuất REPORT.pdf, AI_CRITIQUE.pdf, AILOG.pdf: Markdown -> HTML (marked, Mermaid) -> PDF (Chrome headless).
# Chạy từ thư mục gốc repo. Thư viện cài vào $PDF_DEPS (mặc định /tmp/hw05pdf), không thêm vào repo.
set -euo pipefail
HW="$(cd "$(dirname "$0")/.." && pwd)"
export PDF_DEPS="${PDF_DEPS:-/tmp/hw05pdf}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [[ ! -d "$PDF_DEPS/node_modules/marked" ]]; then
  mkdir -p "$PDF_DEPS" && (cd "$PDF_DEPS" && npm init -y >/dev/null && npm i --silent marked@12 mermaid@10 github-markdown-css@5)
fi
cp "$HW/report/md2html.mjs" "$PDF_DEPS/md2html.mjs"
python3 "$HW/report/build_report.py"
for f in REPORT AI_CRITIQUE AILOG; do
  node "$PDF_DEPS/md2html.mjs" "$HW/$f.md" "$PDF_DEPS/$f.html" >/dev/null
  "$CHROME" --headless=new --disable-gpu --allow-file-access-from-files --no-pdf-header-footer \
    --virtual-time-budget=15000 --print-to-pdf="$HW/$f.pdf" "file://$PDF_DEPS/$f.html" 2>/dev/null
  echo "Đã ghi $HW/$f.pdf"
done
