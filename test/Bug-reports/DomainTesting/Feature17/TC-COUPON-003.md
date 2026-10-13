Title: [PASS][Coupon] Từ chối tạo mã khi thiếu code

## Found by Test Case
TC-COUPON-003

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
1. Để trống `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `code`; không khẳng định message.

## Actual result
Cypress thực thi testcase trong 2806 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-COUPON-003](../../Screenshot/TC-COUPON-003.png)
