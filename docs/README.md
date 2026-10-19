# HW02 — Hồ sơ nộp bài

Sinh viên: Huỳnh Thái Toàn — MSSV: 23120175.

## Tự đánh giá

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | --- | --- |
| 1 | Feature A — FR-05 web (Domain + Boundary) | 25 | 25 |
| 2 | Feature B — FR-11 (Domain + Boundary) | 25 | 25 |
| 3 | Feature C — FR-16 (Domain + Boundary) | 25 | 25 |
| 4 | Feature D — FR-05 mobile (Domain + Boundary) | 15 | 15 |
| 5 | Agent Skills | 10 | 9 |
| | Total | 100 | 99 |

## Test summary

4 chức năng, mỗi pool một chức năng. Chưa có danh sách nhóm để xác minh không trùng FR giữa các thành viên.

### Test chức năng (dùng để đánh giá coverage)

| Chức năng | Thiết kế | Đã chạy | PASS | FAIL | BLOCKED | Chưa chạy |
| --- | --- | --- | --- | --- | --- | --- |
| FR-05 web | 26 | 26 | 7 | 19 | 0 | 0 |
| FR-11 | 28 | 28 | 23 | 5 | 0 | 0 |
| FR-16 | 30 | 30 | 17 | 13 | 0 | 0 |
| FR-05 mobile (Android emulator) | 27 | 27 | 10 | 17 | 0 | 0 |
| Tổng | 111 | 111 | 57 | 54 | 0 | 0 |

### Kiểm tra bổ sung (không tính vào coverage)

| Chức năng | Nội dung | Số test | PASS |
| --- | --- | --- | --- |
| FR-05 web | Query thừa `min_price`, `category`, `sort`, `page`… (TC-14..22, TC-32..45) | 23 | 23 |
| FR-05 mobile | Query thừa `foo` (TC-14) | 1 | 1 |

Tổng cả hai nhóm: 135 thiết kế, 135 đã chạy, 81 PASS, 54 FAIL, 0 BLOCKED. TC-15/16 của mobile đã chạy trên Android emulator: dấu cách bị bỏ khỏi URL nên request thành `search=` rỗng và trả đủ seed. Số FAIL không phải số bug; nhiều test fail cùng một nguyên nhân.

### Bug

24 mã: 20 bug theo đặc tả, 4 mã đã kết luận không vi phạm đặc tả (BUG-07/12/13/19). BUG-24 là thứ tự Tab trên trang hồ sơ, lệch FR-21. BUG-01..23 có issue #44–#66 kèm ảnh. BUG-24 có issue #67.

### Demo và skill

Skill: `eshop-sut/.cursor/skills/fr-domain-testing/SKILL.md`. Đã bổ sung bước chọn điểm on/off/in/out, quy tắc ảnh bằng chứng và miền riêng của mobile.

Video demo: https://youtu.be/b0SKlX8yYJU

## Hồ sơ

- Main report: `docs/main-report.md` và `.pdf`. Mỗi chức năng có sáu file trong `docs/fr-XX/`: biến đầu vào, phân hoạch, on/off/in/out và BVA, test case, kết quả chạy, AI gap analysis.
- Bug report: `docs/bug-report.md`, ảnh trong `docs/bugs/` (ảnh lỗi và ảnh trang issue GitHub).
- AI Critique và AI Audit Report: `docs/ai-critique.md`, `docs/ai-audit-report.md` và bản PDF.
- Git commit log: `docs/git-commit-log.txt`.
- Script chạy test: `scripts/fr05-execute.mjs`, `fr11-execute.mjs`, `fr16-execute.mjs`, `fr05-mobile-execute.mjs` (Expo web), `fr05-mobile-native-execute.py` (Android emulator), `evidence-fr05.mjs`.
