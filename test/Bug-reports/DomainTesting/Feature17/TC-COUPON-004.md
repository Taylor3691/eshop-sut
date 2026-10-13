Title: [PASS][Coupon] Từ chối tạo mã với code đã tồn tại

## Found by Test Case
TC-COUPON-004

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
1. Nhập `EP_COUPON_EXISTING` vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì `code` không duy nhất; không khẳng định message.

## Actual result
Cypress thực thi testcase trong 3161 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-COUPON-004](../../Screenshot/TC-COUPON-004.png)
