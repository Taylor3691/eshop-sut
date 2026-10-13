Title: [BUG][Coupon] Từ chối tạo mã khi thiếu max_uses_per_user

## Found by Test Case
TC-COUPON-012

## Requirement liên quan
FR-17

## Severity / Priority
Medium / High

## Environment
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5174 (API: http://localhost:3000)
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Nhập các field theo Test data, để trống `Số lần dùng tối đa/người`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `max_uses_per_user`.

## Actual result
POST tạo coupon không cung cấp max_uses_per_user trả HTTP 200.

## Evidence
![Evidence TC-COUPON-012](../../Screenshot/TC-COUPON-012.png)
