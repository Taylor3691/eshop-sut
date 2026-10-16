# TC-BVA-COUPON-003: Đơn hàng trên biên tối thiểu của mã SAVE10 (min_order_amount + 1)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập hợp lệ.
- Mã `SAVE10` đang hoạt động, còn hạn sử dụng, `min_order_amount = 300,000 ₫`.
- Người dùng chưa dùng mã `SAVE10` (`usage_count = 0`).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `300,001 ₫` (ngay trên ngưỡng 300,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền `300,001 ₫` và vào trang Checkout.
3. Nhập mã `SAVE10`.
4. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống chấp nhận mã do `total_amount > min_order_amount`.
- Giảm giá 10%: `Math.floor(300,001 × 10 / 100) = 30,000 ₫`.
- Tổng tiền thanh toán: `270,001 ₫`.

## Actual Result

Thỏa điều kiện biên (> 300,000 ₫) nhưng bị lỗi công thức tính phần trăm: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -2,700,009 ₫ Thành tiền: 3,000,010 ₫". Giảm giá bị âm (-2,700,009 ₫), tổng tiền thành 3,000,010 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-003.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay trên ngưỡng tối thiểu (`300,000 + 1 = 300,001 ₫`), thuộc miền hợp lệ của điều kiện C3.

## Status / Related Bugs

FAIL / DEF-FR09-01 — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
