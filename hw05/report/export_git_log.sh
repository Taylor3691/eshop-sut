#!/usr/bin/env bash
# Xuất git log của nhánh HW05 (từ main) ra hw05/git_log.txt. Chạy từ thư mục gốc repo.
set -euo pipefail
O=hw05/git_log.txt
{
  echo "HW05 – Performance Testing · 23120175 · Git commit log"
  echo "Repo: https://github.com/Taylor3691/eshop-sut (nhánh hw05/toanhuynh)"
  echo "Phạm vi: các commit của nhánh hw05/toanhuynh tính từ main (git log main..HEAD), xếp từ cũ đến mới"
  echo "Xuất lúc: $(date '+%Y-%m-%d %H:%M:%S %z') · HEAD: $(git rev-parse --short HEAD)"
  echo "Số commit: $(git rev-list --count main..HEAD)"
  echo
  echo "== Tóm tắt =="
  git log main..HEAD --reverse --date=format:'%Y-%m-%d %H:%M' --pretty=format:'%h  %ad  %s'
  echo; echo
  echo "== Chi tiết (nội dung commit và file thay đổi) =="
  git log main..HEAD --reverse --date=format:'%Y-%m-%d %H:%M:%S %z' --stat=120 --pretty=format:'%ncommit %H%nAuthor: %an%nDate:   %ad%n%n%w(0,4,4)%B'
} > "$O"
echo "Đã ghi $O ($(wc -l < "$O") dòng, $(git rev-list --count main..HEAD) commit, HEAD $(git rev-parse --short HEAD))"
