# TC-BVA-COUPON-006: Đơn hàng trên biên tối thiểu của mã BIGBUY (min_order_amount + 1)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập hợp lệ.
- Mã `BIGBUY` loại `fixed`, giảm 50,000 ₫, `min_order_amount = 500,000 ₫`, `is_active = 1`.
- Người dùng chưa dùng mã `BIGBUY`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `500,001 ₫` (ngay trên ngưỡng 500,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền `500,001 ₫`.
3. Nhập mã `BIGBUY` và nhấn "Áp dụng".

## Expected Result

- Hệ thống chấp nhận mã.
- Giảm giá `50,000 ₫`.
- Tổng thanh toán: `500,001 - 50,000 = 450,001 ₫`.

## Actual Result

Chấp nhận chính xác giá trị trên biên: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 450,001 ₫". Giảm 50,000 ₫, thành tiền 450,001 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-006.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay trên ngưỡng tối thiểu của mã `BIGBUY` (`500,000 + 1 = 500,001 ₫`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
