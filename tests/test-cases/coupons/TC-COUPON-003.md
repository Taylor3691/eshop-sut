# TC-COUPON-003: Áp dụng mã giảm giá nhiều lượt dùng ở lần đầu tiên (VIP100)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập hợp lệ (C4 = True).
- Mã `VIP100` tồn tại, `is_active = 1`, loại `fixed`, giảm 100,000 ₫, `min_order_amount = 300,000 ₫`, `max_uses_per_user = 2` (C1, C2 = True).
- Người dùng chưa sử dụng mã `VIP100` lần nào (`usage_count = 0 < 2`) (C5 = True).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng trị giá `400,000 ₫` và vào trang Checkout.
3. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result

- Áp dụng thành công, giảm `100,000 ₫`.
- Tổng thanh toán hiển thị: `300,000 ₫`.

## Actual Result

Áp dụng thành công ở lượt đầu tiên: "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 300,000 ₫". Giảm 100,000 ₫, thành tiền 300,000 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-003.png)

## Coverage Rationale

Kiểm thử phân hoạch mã giảm giá cho phép dùng nhiều lần (`max_uses_per_user = 2`) ở trạng thái sử dụng lần 1 (`usage_count = 0`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
