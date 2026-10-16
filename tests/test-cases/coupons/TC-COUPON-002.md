# TC-COUPON-002: Áp dụng thành công mã giảm giá số tiền cố định khi thỏa mãn đủ 5 điều kiện (BIGBUY)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập với JWT Token hợp lệ (C4 = True).
- Mã `BIGBUY` tồn tại trong CSDL, `is_active = 1`, loại `fixed`, giá trị giảm 50,000 ₫, ngưỡng tối thiểu 500,000 ₫ (C1 = True).
- Mã còn hạn sử dụng (`expired_at = 2099-12-31`) (C2 = True).
- Người dùng chưa dùng mã này (`usage_count = 0 < max_uses_per_user = 1`) (C5 = True).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `600,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập với tài khoản `test@eshop.com`.
2. Chuẩn bị đơn hàng có tổng tiền `600,000 ₫` và vào trang Checkout.
3. Nhập mã `BIGBUY` vào ô mã giảm giá.
4. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống thông báo áp dụng thành công.
- Số tiền giảm giá cố định: `50,000 ₫`.
- Tổng tiền thanh toán cuối cùng: `600,000 - 50,000 = 550,000 ₫`.

## Actual Result

Áp dụng thành công: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫". Giảm chính xác 50,000 ₫, thành tiền 550,000 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-002.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cho loại mã giảm giá số tiền cố định (`fixed`), thỏa mãn trọn vẹn 5 điều kiện C1-C5.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
