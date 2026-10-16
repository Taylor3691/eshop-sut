# TC-BVA-COUPON-014: Biên thời gian hết hạn - Mã đã qua hạn sử dụng (current_date > expired_at)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `EXPIRED` có `expired_at = 2020-01-01`.
- Thời gian hiện tại sau ngày hết hạn (`now > expired_at`).
- Đơn hàng đạt `200,000 ₫` (vượt ngưỡng `min_order_amount = 100,000 ₫`).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `EXPIRED` |
| `cart_total` | `200,000 ₫` |
| `current_date` | Thời gian thực thi hiện tại |

## Test Steps

1. Đăng nhập và tạo đơn hàng `200,000 ₫`.
2. Nhập mã `EXPIRED` và nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng mã do vi phạm điều kiện C2: Ngày hiện tại phải trước `expired_at`.
- Hiển thị thông báo lỗi: Mã giảm giá đã hết hạn.
- Giảm giá bằng `0 ₫`.

## Actual Result

Từ chối chính xác mã đã qua hạn sử dụng: "Mã giảm giá đã hết hạn".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-014.png)

## Boundary Rationale

Kiểm tra biên thời gian đã hết hạn (thuộc miền không hợp lệ của điều kiện C2).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
