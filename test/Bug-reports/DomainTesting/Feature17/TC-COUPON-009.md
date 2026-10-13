Title: [PASS][Coupon] Từ chối tạo mã khi thiếu expired_at

## Found by Test Case
TC-COUPON-009

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
1. Nhập các field theo Test data, để trống input ngày `Ngày hết hạn`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `expired_at`; không khẳng định format/message.

## Actual result
Cypress thực thi testcase trong 2645 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-COUPON-009](../../Screenshot/TC-COUPON-009.png)
