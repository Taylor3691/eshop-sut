# TC-BVA-COUPON-001: Đơn hàng dưới biên tối thiểu của mã SAVE10 (min_order_amount - 1)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập hợp lệ với JWT Token.
- Mã `SAVE10` đang hoạt động (`is_active = 1`), còn hạn đến `2099-12-31`, có `min_order_amount = 300,000 ₫`.
- Người dùng chưa từng sử dụng mã `SAVE10` (`usage_count = 0`).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `299,999 ₫` (ngay dưới ngưỡng 300,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền `299,999 ₫` và vào trang Checkout.
3. Nhập mã `SAVE10` vào ô mã giảm giá.
4. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng mã do vi phạm điều kiện C3 (`total_amount < min_order_amount`).
- Hiển thị thông báo lỗi: Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này.
- Số tiền giảm giá là `0 ₫`, tổng tiền thanh toán giữ nguyên `299,999 ₫`.

## Actual Result

Từ chối chính xác giá trị dưới biên: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-001.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay dưới ngưỡng tối thiểu (`300,000 - 1 = 299,999 ₫`), thuộc miền không hợp lệ của điều kiện C3.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
