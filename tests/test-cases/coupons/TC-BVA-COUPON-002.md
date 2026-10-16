# TC-BVA-COUPON-002: Đơn hàng tại đúng biên tối thiểu của mã SAVE10 (min_order_amount)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập với JWT Token hợp lệ.
- Mã `SAVE10` đang hoạt động (`is_active = 1`), còn hạn sử dụng, `min_order_amount = 300,000 ₫`.
- Người dùng chưa dùng mã `SAVE10` (`usage_count = 0`).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `300,000 ₫` (chính xác bằng ngưỡng tối thiểu) |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền chính xác `300,000 ₫` và vào trang Checkout.
3. Nhập mã `SAVE10`.
4. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống chấp nhận mã vì theo đặc tả C3: Tổng đơn hàng `>= min_order_amount` (300,000 >= 300,000).
- Áp dụng giảm giá 10%: `30,000 ₫`.
- Tổng tiền thanh toán: `270,000 ₫`.

## Actual Result

Bị từ chối sai lệch tại đúng biên: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Vi phạm điều kiện C3 (toán tử > thay vì >=).

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-002.png)

## Boundary Rationale

Kiểm tra giá trị tại đúng ngưỡng biên tối thiểu (`min_order_amount = 300,000 ₫`), thuộc miền hợp lệ theo đặc tả C3.

## Status / Related Bugs

FAIL / DEF-FR09-02 — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
