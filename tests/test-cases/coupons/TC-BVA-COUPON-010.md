# TC-BVA-COUPON-010: Số lượt sử dụng dưới biên tối đa của mã 2 lượt (usage_count = 1 < max_uses_per_user = 2)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`, `min_order_amount = 300,000 ₫`.
- Người dùng đã sử dụng mã `VIP100` 1 lần trước đó (`usage_count = 1`).
- Đơn hàng đạt `400,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `current_usage` | `1` (dưới biên tối đa 2 lượt) |

## Test Steps

1. Đăng nhập và vào Checkout với đơn hàng `400,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result

- Hệ thống chấp nhận mã vì `usage_count < max_uses_per_user` (`1 < 2`).
- Giảm giá `100,000 ₫`, thành tiền `300,000 ₫`.

## Actual Result

Chấp nhận khi số lượt dưới biên tối đa (usage = 1 < 2): "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 300,000 ₫".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-010.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay dưới ngưỡng tối đa của mã nhiều lượt (`max - 1 = 2 - 1 = 1`), vẫn là lượt hợp lệ cuối cùng.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
