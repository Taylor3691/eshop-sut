# TC-COUPON-007: Từ chối mã giảm giá đã bị vô hiệu hóa is_active = 0 (Condition C1 Invalid)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `INACTIVE50` tồn tại trong CSDL nhưng có `is_active = 0`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `INACTIVE50` |
| `cart_total` | `600,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Tại trang Checkout, nhập mã `INACTIVE50`.
2. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng do mã đang ở trạng thái ngừng kích hoạt (`is_active = 0`).
- Hiển thị thông báo mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa.
- Không giảm giá đơn hàng.

## Actual Result

Từ chối chính xác mã có is_active = 0: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa".

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-007.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ của điều kiện C1 với mã tồn tại nhưng trạng thái `is_active = 0`.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
