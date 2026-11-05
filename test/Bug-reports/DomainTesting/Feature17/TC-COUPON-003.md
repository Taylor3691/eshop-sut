Title: [PASS][Coupon] Từ chối tạo mã khi thiếu code

## Found by Test Case
TC-COUPON-003

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
1. Để trống `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `code`; không khẳng định message.

## Actual result
Cypress ghi nhận trạng thái cuối cùng passed.

## Evidence
![Evidence TC-COUPON-003](../../Screenshot/TC-COUPON-003.png)
