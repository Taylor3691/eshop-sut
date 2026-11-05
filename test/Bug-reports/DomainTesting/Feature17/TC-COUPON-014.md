Title: [BLOCKED][Coupon] Xem mã giảm giá hiện có

## Found by Test Case
TC-COUPON-014

## Requirement liên quan
FR-17

## Severity / Priority
N/A / N/A

## Environment
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5174
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Mở tab `Mã Giảm Giá` nếu chưa mở.
2. Quan sát bảng coupon và tìm chính xác mã `EP_COUPON_VIEW` trong cột `Mã`.

## Expected result
Admin xem được mã `EP_COUPON_VIEW`; FR-17 không quy định danh sách/chi tiết hoặc cột hiển thị.

## Actual result
Cypress ghi nhận testcase pending do it.skip(); precondition hoặc fixture được định danh chưa đủ để thực thi an toàn.

## Evidence
Không có screenshot vì testcase chưa được thực thi.
