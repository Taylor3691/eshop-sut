# TC-COUPON-016: Áp dụng mã giảm giá cố định bằng giá trị đơn hàng (Boundary final_amount = 0)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng đã đăng nhập.
- Có mã giảm giá cố định `100,000 ₫` với ngưỡng tối thiểu `100,000 ₫`.
- Đơn hàng trị giá `100,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | Mã giảm 100,000 ₫ |
| `cart_total` | `100,000 ₫` |

## Test Steps

1. Tạo đơn hàng trị giá đúng `100,000 ₫`.
2. Nhập mã và áp dụng.

## Expected Result

- `discount_amount = 100,000 ₫`.
- `final_amount = 100,000 - 100,000 = 0 ₫`.
- Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không bị lỗi tính toán số âm.

## Actual Result

Bị từ chối do lỗi biên min_order_amount: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Backend không cho phép total_amount == min_order_amount.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-016.png)

## Coverage Rationale

Kiểm thử biên giá trị thành tiền sau giảm giá đạt ngưỡng tối thiểu (`final_amount = 0`).

## Status / Related Bugs

FAIL / DEF-FR09-02 — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
