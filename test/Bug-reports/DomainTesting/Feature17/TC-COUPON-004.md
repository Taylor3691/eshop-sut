Title: [PASS][Coupon] Từ chối tạo mã với code đã tồn tại

## Found by Test Case
TC-COUPON-004

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
1. Nhập `EP_COUPON_EXISTING` vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì `code` không duy nhất; không khẳng định message.

## Actual result
Cypress ghi nhận trạng thái cuối cùng passed.

## Evidence
![Evidence TC-COUPON-004](../../Screenshot/TC-COUPON-004.png)
