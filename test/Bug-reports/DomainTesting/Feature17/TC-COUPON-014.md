Title: [BLOCKED][Coupon] Xem mã giảm giá hiện có

## Found by Test Case
TC-COUPON-014

## Requirement liên quan
FR-17

## Severity / Priority
N/A / N/A

## Environment
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5174 (API: http://localhost:3000)
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Mở tab `Mã Giảm Giá` nếu chưa mở.
2. Quan sát bảng coupon và tìm chính xác mã `EP_COUPON_VIEW` trong cột `Mã`.

## Expected result
Admin xem được mã `EP_COUPON_VIEW`; FR-17 không quy định danh sách/chi tiết hoặc cột hiển thị.

## Actual result
Testcase chưa được thực thi. EP_COUPON_VIEW không có cấu hình fixture được định danh trong testcase hoặc tài liệu nguồn để tái tạo precondition.

## Evidence
Không có screenshot vì testcase chưa được thực thi hợp lệ.
