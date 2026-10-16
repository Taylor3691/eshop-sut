# TC-BVA-COUPON-016: Biên giá trị thanh toán cuối cùng ngay trên 0 ₫ (final_amount = 1 ₫)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng đã đăng nhập.
- Mã giảm giá loại `fixed` có giá trị giảm `100,000 ₫` và `min_order_amount = 100,000 ₫`.
- Đơn hàng có tổng tiền `100,001 ₫`.

## Test Data

| Field | Value |
|---|---|
| `cart_total` | `100,001 ₫` |
| `discount_value` | `100,000 ₫` (loại fixed) |

## Test Steps

1. Tạo đơn hàng trị giá `100,001 ₫`.
2. Áp dụng mã giảm giá.

## Expected Result

- `discount_amount = 100,000 ₫`.
- `final_amount = 100,001 - 100,000 = 1 ₫`.
- Hệ thống ghi nhận số tiền thanh toán `1 ₫` chính xác.

## Actual Result

Chấp nhận chính xác khi vượt ngưỡng 1 ₫: "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 1 ₫". Giảm 100,000 ₫, thành tiền còn lại đúng 1 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-016.png)

## Boundary Rationale

Kiểm tra giá trị biên danh định ngay trên mức 0 ₫ (`final_amount = 1 ₫`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
