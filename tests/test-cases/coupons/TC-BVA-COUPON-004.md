# TC-BVA-COUPON-004: Đơn hàng dưới biên tối thiểu của mã BIGBUY (min_order_amount - 1)

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
| `cart_total` | `499,999 ₫` (ngay dưới ngưỡng 500,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com`.
2. Chuẩn bị đơn hàng có tổng tiền `499,999 ₫`.
3. Nhập mã `BIGBUY` tại trang Checkout và nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng do không thỏa điều kiện C3 (`499,999 < 500,000 ₫`).
- Hiển thị thông báo lỗi đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫.
- Giảm giá bằng `0 ₫`, tổng tiền giữ nguyên `499,999 ₫`.

## Actual Result

Từ chối chính xác giá trị dưới biên tối thiểu: "Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này".

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-004.png)

## Boundary Rationale

Kiểm tra giá trị biên dưới của mã cố định `BIGBUY` (`500,000 - 1 = 499,999 ₫`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
