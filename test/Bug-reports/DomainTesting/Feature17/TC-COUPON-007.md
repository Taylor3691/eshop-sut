Title: [PASS][Coupon] Từ chối tạo mã khi thiếu discount_value

## Found by Test Case
TC-COUPON-007

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
1. Nhập các field theo Test data, để trống field `Số tiền (VD: 50000)`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `discount_value`; không khẳng định message.

## Actual result
Cypress thực thi testcase trong 2884 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-COUPON-007](../../Screenshot/TC-COUPON-007.png)
