# TC-BVA-COUPON-013: Biên thời gian hết hạn - Mã còn hạn xa (current_date < expired_at)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `expired_at = 2099-12-31`.
- Thời gian hiện tại trước ngày hết hạn (`now < expired_at`).
- Đơn hàng đạt `350,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `350,000 ₫` |
| `current_date` | Thời gian thực thi hiện tại |

## Test Steps

1. Đăng nhập và tạo đơn hàng `350,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result

- Hệ thống chấp nhận mã vì thỏa điều kiện C2 (`now < expired_at`).
- Giảm giá 10%: `35,000 ₫`.

## Actual Result

Chấp nhận chính xác mã còn hạn: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-013.png)

## Boundary Rationale

Kiểm tra biên thời gian còn hạn (thuộc miền hợp lệ của điều kiện C2).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
