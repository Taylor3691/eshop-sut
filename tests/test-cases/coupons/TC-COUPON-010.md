# TC-COUPON-010: Từ chối khi người dùng đã sử dụng hết số lượt cho phép (Condition C5 Invalid)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Người dùng `test@eshop.com` đã dùng mã `SAVE10` thành công 1 lần trong quá khứ (`usage_count = 1`).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `400,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập bằng tài khoản `test@eshop.com`.
2. Tạo đơn hàng trị giá `400,000 ₫` và vào trang Checkout.
3. Nhập lại mã `SAVE10` lần thứ hai.
4. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống từ chối do vi phạm điều kiện C5: `usage_count >= max_uses_per_user` (1 >= 1).
- Hiển thị thông báo lỗi người dùng đã sử dụng hết lượt cho phép đối với mã này.
- Không áp dụng giảm giá.

## Actual Result

Từ chối chính xác khi hết lượt sử dụng: "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)".

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-010.png)

## Coverage Rationale

Kiểm thử giá trị biên và phân hoạch không hợp lệ của điều kiện C5 (vượt quá giới hạn số lượt dùng của người dùng).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
