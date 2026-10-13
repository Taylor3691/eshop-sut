Title: [BLOCKED][Quản lý Mã Giảm Giá] Tạo mã với min_order_amount bằng 0

## Found by Test Case
TC-BVA-FR17-002

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
1. Trong form tạo coupon, nhập code vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào đúng field theo placeholder UI.
2. Bấm `Tạo mã`.

## Expected result
Mã giảm giá được tạo thành công vì `min_order_amount = 0` thỏa `>= 0` và các input khác hợp lệ.

## Actual result
Testcase không vượt cổng bất biến Test data. Test data yêu cầu min_order_amount = 0 trong Boundary nhưng spec bỏ trường min_order_amount; helper gửi giá trị rỗng.

## Evidence
Không có screenshot vì testcase chưa được thực thi hợp lệ.
