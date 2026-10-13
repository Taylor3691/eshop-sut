Title: [BUG][Coupon] Từ chối tạo mã khi thiếu min_order_amount

## Found by Test Case
TC-COUPON-010

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
1. Nhập các field theo Test data, để trống `Đơn tối thiểu (₫)`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `min_order_amount`.

## Actual result
POST tạo coupon trả HTTP 200 khi min_order_amount bị bỏ trống hoặc bằng -1000.

## Evidence
![Evidence TC-COUPON-010](../../Screenshot/TC-COUPON-010.png)
