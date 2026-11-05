Title: [BUG][Coupon] Từ chối tạo mã khi thiếu max_uses_per_user

## Found by Test Case
TC-COUPON-012

## Requirement liên quan
FR-17

## Severity / Priority
TBD / TBD

## Environment
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5174
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Nhập các field theo Test data, để trống `Số lần dùng tối đa/người`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `max_uses_per_user`.

## Actual result
AssertionError: Timed out retrying after 8000ms: expected 200 to be at least 400

## Evidence
![Evidence TC-COUPON-012](../../Screenshot/TC-COUPON-012.png)
