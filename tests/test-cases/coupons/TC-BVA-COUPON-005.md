# TC-BVA-COUPON-005: Đơn hàng tại đúng biên tối thiểu của mã BIGBUY (min_order_amount)

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
| `cart_total` | `500,000 ₫` (chính xác bằng ngưỡng tối thiểu) |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Chuẩn bị đơn hàng có tổng tiền đúng `500,000 ₫`.
3. Nhập mã `BIGBUY` và nhấn "Áp dụng".

## Expected Result

- Hệ thống chấp nhận mã theo đặc tả C3 (`total_amount >= min_order_amount`).
- Số tiền giảm giá cố định: `50,000 ₫`.
- Tổng thanh toán: `450,000 ₫`.

## Actual Result

Bị từ chối sai lệch tại đúng biên: "Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này". Vi phạm điều kiện C3.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-005.png)

## Boundary Rationale

Kiểm tra giá trị tại ngưỡng biên tối thiểu của mã `BIGBUY` (`500,000 ₫`), xác minh điều kiện bao gồm dấu bằng (`>=`).

## Status / Related Bugs

FAIL / DEF-FR09-02 — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
