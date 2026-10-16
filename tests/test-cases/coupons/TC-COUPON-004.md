# TC-COUPON-004: Áp dụng mã giảm giá tại đúng ngưỡng giá trị tối thiểu (Boundary total == min_order_amount)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập (C4 = True).
- Mã `SAVE10` có `min_order_amount = 300,000 ₫`, `is_active = 1`, còn hạn (C1, C2, C5 = True).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `300,000 ₫` (chính xác bằng `min_order_amount`) |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo giỏ hàng có tổng giá trị chính xác là `300,000 ₫`.
3. Điều hướng đến trang Checkout.
4. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result

- Hệ thống chấp nhận mã vì điều kiện C3 quy định: Tổng đơn hàng `>= min_order_amount`.
- Giảm giá 10%: `30,000 ₫`.
- Tổng thanh toán còn lại: `270,000 ₫`.

## Actual Result

Bị từ chối với lỗi: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Backend dùng toán tử ">" thay vì ">=" đối với min_order_amount (300,000 ₫).

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-004.png)

## Coverage Rationale

Kiểm thử giá trị biên chính xác tại ngưỡng tối thiểu của C3 (`total_amount == min_order_amount`).

## Status / Related Bugs

FAIL / DEF-FR09-02 — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
