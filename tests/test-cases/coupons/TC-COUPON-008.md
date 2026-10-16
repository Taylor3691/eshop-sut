# TC-COUPON-008: Từ chối mã giảm giá đã hết hạn sử dụng (Condition C2 Invalid - EXPIRED)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `EXPIRED` có trong CSDL nhưng ngày hết hạn là `2020-01-01` (đã qua so với ngày hiện tại).
- Giá trị đơn hàng thỏa ngưỡng `min_order_amount = 100,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `EXPIRED` |
| `cart_total` | `200,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Tại trang Checkout, nhập mã `EXPIRED`.
2. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng do vi phạm điều kiện C2: Ngày hiện tại không trước `expired_at`.
- Hiển thị thông báo lỗi: Mã giảm giá đã hết hạn.
- Không tính giảm giá.

## Actual Result

Từ chối chính xác mã quá hạn: "Mã giảm giá đã hết hạn".

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-008.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ của điều kiện C2 (mã hết hạn sử dụng).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
