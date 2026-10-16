# TC-COUPON-001: Áp dụng thành công mã giảm giá phần trăm khi thỏa mãn đủ 5 điều kiện (SAVE10)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập hợp lệ và có JWT Token (C4 = True).
- Mã `SAVE10` tồn tại trong cơ sở dữ liệu với `is_active = 1` (C1 = True).
- Ngày hiện tại trước `2099-12-31` (C2 = True).
- Người dùng chưa từng sử dụng mã `SAVE10` (`usage_count = 0 < max_uses_per_user = 1`) (C5 = True).
- Giỏ hàng có sản phẩm với tổng tiền lớn hơn ngưỡng tối thiểu 300,000 ₫ (C3 = True).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập vào hệ thống bằng tài khoản `test@eshop.com`.
2. Thêm sản phẩm vào giỏ hàng sao cho tổng tiền đạt `500,000 ₫`.
3. Điều hướng đến trang Checkout (`/checkout`).
4. Nhập mã `SAVE10` vào ô "Mã Giảm Giá".
5. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống thông báo áp dụng mã thành công.
- Số tiền giảm giá được tính theo công thức phần trăm: `500,000 × 10 / 100 = 50,000 ₫`.
- Tổng tiền thanh toán cuối cùng hiển thị: `500,000 - 50,000 = 450,000 ₫`.

## Actual Result

Hệ thống tính sai công thức giảm giá: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -4,500,000 ₫ Thành tiền: 5,000,000 ₫". Giảm giá bị âm (-4,500,000 ₫), đội tổng tiền thanh toán lên 5,000,000 ₫ thay vì giảm 10% (450,000 ₫).

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-001.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cho loại mã giảm giá phần trăm (`percent`), bao phủ tổ hợp thỏa mãn cả 5 điều kiện hợp lệ C1-C5.

## Status / Related Bugs

FAIL / DEF-FR09-01 — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
