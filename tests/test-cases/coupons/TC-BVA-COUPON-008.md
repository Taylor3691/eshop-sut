# TC-BVA-COUPON-008: Số lượt sử dụng tại đúng biên tối đa của mã 1 lượt (usage_count = 1 == max_uses_per_user = 1)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Người dùng đã sử dụng mã `SAVE10` thành công đúng 1 lần (`usage_count = 1`).
- Đơn hàng đạt `500,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `current_usage` | `1` (bằng đúng giới hạn tối đa) |

## Test Steps

1. Đăng nhập và tạo đơn hàng `500,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng do vi phạm điều kiện C5 (điều kiện yêu cầu `usage_count < max_uses_per_user`, nhưng hiện tại `1 >= 1`).
- Hiển thị thông báo lỗi: Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn).
- Giảm giá bằng `0 ₫`.

## Actual Result

Từ chối chính xác khi đạt đúng biên tối đa (usage = 1 == 1): "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-008.png)

## Boundary Rationale

Kiểm tra giá trị tại đúng ngưỡng giới hạn số lượt sử dụng (`usage_count = max_uses_per_user = 1`), chuyển sang miền không hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
