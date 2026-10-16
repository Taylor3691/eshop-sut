# TC-BVA-COUPON-012: Số lượt sử dụng trên biên tối đa của mã 2 lượt (usage_count = 3 > max_uses_per_user = 2)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`.
- Đã ghi nhận 3 lần sử dụng (`usage_count = 3`).
- Đơn hàng đạt `400,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `current_usage` | `3` (vượt trên giới hạn tối đa) |

## Test Steps

1. Đăng nhập và tạo đơn hàng `400,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng do `usage_count >= max_uses_per_user` (`3 >= 2`).
- Giảm giá bằng `0 ₫`.

## Actual Result

Từ chối chính xác khi vượt quá biên tối đa (usage = 3 > 2): "Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-012.png)

## Boundary Rationale

Kiểm tra giá trị biên trên của số lần sử dụng cho mã 2 lượt (`max + 1 = 2 + 1 = 3`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
