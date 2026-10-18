# HW02 — Hồ sơ nộp bài

Sinh viên: Huỳnh Thái Toàn — MSSV: 23120175.

## Tự đánh giá

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | --- | --- |
| 1 | Feature A — FR-05 web (Domain + Boundary) | 25 | 21 |
| 2 | Feature B — FR-11 (Domain + Boundary) | 25 | 22 |
| 3 | Feature C — FR-16 (Domain + Boundary) | 25 | 22 |
| 4 | Feature D — FR-05 mobile (Domain + Boundary) | 15 | 11 |
| 5 | Agent Skills | 10 | 7 |
| | Total | 100 | 83 |

Điểm trừ còn lại: mobile chỉ chạy trên Expo web, chưa chạy Android/iOS; video demo có trước bản skill hiện tại; BUG-23 chưa có issue GitHub và bằng chứng mới chưa gắn lên các issue cũ.

## Test summary

4 chức năng, mỗi pool một chức năng. Chưa có danh sách nhóm để xác minh không trùng FR giữa các thành viên.

### Test chức năng (dùng để đánh giá coverage)

| Chức năng | Thiết kế | Đã chạy | PASS | FAIL | BLOCKED | Chưa chạy |
| --- | --- | --- | --- | --- | --- | --- |
| FR-05 web | 26 | 26 | 7 | 19 | 0 | 0 |
| FR-11 | 28 | 28 | 23 | 5 | 0 | 0 |
| FR-16 | 30 | 30 | 17 | 13 | 0 | 0 |
| FR-05 mobile (Expo web) | 27 | 25 | 10 | 15 | 2 | 0 |
| Tổng | 111 | 109 | 57 | 52 | 2 | 0 |

### Kiểm tra bổ sung (không tính vào coverage)

| Chức năng | Nội dung | Số test | PASS |
| --- | --- | --- | --- |
| FR-05 web | Query thừa `min_price`, `category`, `sort`, `page`… (TC-14..22, TC-32..45) | 23 | 23 |
| FR-05 mobile | Query thừa `foo` (TC-14) | 1 | 1 |

Tổng cả hai nhóm: 135 thiết kế, 133 đã chạy, 81 PASS, 52 FAIL, 2 BLOCKED. Hai BLOCKED là FR-05 mobile TC-15/16: Chrome cắt dấu cách cuối URL, cần thiết bị native. Số FAIL không phải số bug; nhiều test fail cùng một nguyên nhân.

### Bug

23 mã bug: 19 bug theo đặc tả, 4 phát hiện chờ làm rõ oracle (BUG-07/12/13/19). BUG-01..22 có issue #44–#65 kèm ảnh. BUG-23 (web cắt từ khóa có `&`/`#`) đã ghi trong `bug-report.md`, chưa tạo issue vì cần push ảnh. Thứ tự Tab ở FR-11 (TC-28) là phát hiện chờ làm rõ, chưa lập bug.

### Demo và skill

Skill: `eshop-sut/.cursor/skills/fr-domain-testing/SKILL.md`. Đã bổ sung bước chọn điểm on/off/in/out, quy tắc ảnh bằng chứng và miền riêng của mobile.

Video demo: https://youtu.be/b0SKlX8yYJU (quay với bản skill trước lần cập nhật này).

## Hồ sơ

- Main report: `docs/main-report.md` và `.pdf`. Mỗi chức năng có sáu file trong `docs/fr-XX/`: biến đầu vào, phân hoạch, on/off/in/out và BVA, test case, kết quả chạy, AI gap analysis.
- Bug report: `docs/bug-report.md`, ảnh trong `docs/bugs/` (ảnh lỗi và ảnh trang issue GitHub).
- AI Critique và AI Audit Report: `docs/ai-critique.md`, `docs/ai-audit-report.md` và bản PDF.
- Git commit log: `docs/git-commit-log.txt`.
- Script chạy test: `scripts/fr05-execute.mjs`, `fr11-execute.mjs`, `fr16-execute.mjs`, `fr05-mobile-execute.mjs`, `evidence-fr05.mjs`.
