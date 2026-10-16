# TC-BVA-COUPON-007: Số lượt sử dụng dưới biên tối đa của mã 1 lượt (usage_count = 0 < max_uses_per_user = 1)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Số lần đã dùng của người dùng trong bảng `coupon_usage` là 0 (`usage_count = 0`).
- Đơn hàng đạt `500,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `current_usage` | `0` (dưới biên tối đa 1 lượt) |

## Test Steps

1. Đăng nhập và tạo đơn hàng `500,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result

- Áp dụng thành công vì `usage_count < max_uses_per_user` (`0 < 1`).
- Giảm giá `50,000 ₫`, thành tiền `450,000 ₫`.

## Actual Result

Chấp nhận khi số lượt dưới biên tối đa (usage = 0 < 1): "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-007.png)

## Boundary Rationale

Kiểm tra giá trị biên dưới của số lần sử dụng (`max - 1 = 0`), thuộc miền hợp lệ của C5.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
