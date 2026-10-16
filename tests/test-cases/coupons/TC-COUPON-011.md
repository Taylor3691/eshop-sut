# TC-COUPON-011: Kiểm thử chu kỳ dùng đủ 2 lượt của mã nhiều lượt (VIP100 - Boundary C5)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`.
- Người dùng đã sử dụng thành công 1 lần trước đó (`usage_count = 1 < 2`).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `350,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập và vào Checkout với đơn hàng `350,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng" (Lần 2).
3. Hoàn tất thanh toán đơn hàng để hệ thống ghi nhận `usage_count = 2`.
4. Tạo tiếp đơn hàng thứ ba trị giá `350,000 ₫`, nhập lại mã `VIP100` và nhấn "Áp dụng" (Lần 3).

## Expected Result

- Ở Lần 2 (`usage_count = 1 < 2`): Áp dụng thành công, giảm `100,000 ₫`.
- Ở Lần 3 (`usage_count = 2 == 2`): Hệ thống từ chối áp dụng và thông báo đã hết lượt sử dụng.

## Actual Result

Chấp nhận thành công ở lượt thứ 2 (usage_count = 1 < 2): "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 300,000 ₫". Giảm 100,000 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-011.png)

## Coverage Rationale

Kiểm thử biên giá trị tại ngưỡng chuyển tiếp từ hợp lệ sang không hợp lệ của điều kiện C5 (`usage_count = 1` hợp lệ; `usage_count = 2` không hợp lệ).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
