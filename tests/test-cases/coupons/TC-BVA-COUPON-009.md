# TC-BVA-COUPON-009: Số lượt sử dụng trên biên tối đa của mã 1 lượt (usage_count = 2 > max_uses_per_user = 1)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Giả định hoặc đã ghi nhận 2 lần sử dụng (`usage_count = 2`).
- Đơn hàng đạt `500,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `current_usage` | `2` (vượt trên giới hạn tối đa) |

## Test Steps

1. Đăng nhập và tạo đơn hàng `500,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng do `usage_count >= max_uses_per_user` (`2 >= 1`).
- Báo lỗi đã vượt quá giới hạn lượt sử dụng.

## Actual Result

Từ chối chính xác khi vượt quá biên tối đa (usage = 2 > 1): "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-009.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay trên ngưỡng giới hạn số lượt sử dụng (`max + 1 = 2`), thuộc miền không hợp lệ của C5.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
