Title: [PASS][Quản lý Mã Giảm Giá] Tạo mã với max_uses_per_user bằng 1

## Found by Test Case
TC-BVA-FR17-004

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
1. Trong form tạo coupon, nhập code vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào đúng field theo placeholder UI.
2. Bấm `Tạo mã`.

## Expected result
Mã giảm giá được tạo thành công vì `max_uses_per_user = 1` nằm đúng tại giới hạn dưới và các input khác hợp lệ.

## Actual result
Cypress ghi nhận trạng thái cuối cùng passed.

## Evidence
![Evidence TC-BVA-FR17-004](../../Screenshot/TC-BVA-FR17-004.png)
