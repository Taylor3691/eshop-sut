# TC-BVA-COUPON-011: Số lượt sử dụng tại đúng biên tối đa của mã 2 lượt (usage_count = 2 == max_uses_per_user = 2)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`.
- Người dùng đã hoàn tất 2 lần sử dụng mã `VIP100` (`usage_count = 2`).
- Đơn hàng đạt `400,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `current_usage` | `2` (bằng đúng giới hạn tối đa) |

## Test Steps

1. Đăng nhập và tạo đơn hàng `400,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng vì đã dùng đủ 2 lượt (`usage_count >= 2`).
- Hiển thị thông báo: Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn).
- Giảm giá bằng `0 ₫`.

## Actual Result

Từ chối chính xác khi đạt đúng biên tối đa (usage = 2 == 2): "Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-011.png)

## Boundary Rationale

Kiểm tra giá trị tại ngưỡng biên giới hạn của mã 2 lượt (`usage_count = max_uses_per_user = 2`), thuộc miền không hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
