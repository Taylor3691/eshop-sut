Title: [PASS][Coupon] Từ chối tạo mã khi thiếu expired_at

## Found by Test Case
TC-COUPON-009

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
1. Nhập các field theo Test data, để trống input ngày `Ngày hết hạn`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `expired_at`; không khẳng định format/message.

## Actual result
Cypress ghi nhận trạng thái cuối cùng passed.

## Evidence
![Evidence TC-COUPON-009](../../Screenshot/TC-COUPON-009.png)
