# TC-COUPON-009: Từ chối áp dụng mã giảm giá khi người dùng chưa đăng nhập (Condition C4 Invalid)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Khách vãng lai (Guest) truy cập trang Checkout mà không có JWT Token hợp lệ (C4 = False).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `user` | Không có (chưa đăng nhập / Token rỗng) |

## Test Steps

1. Truy cập trực tiếp bước Checkout hoặc gọi API `/api/apply-coupon` mà không gửi kèm JWT Token / không có phiên đăng nhập.
2. Nhập mã `SAVE10` và yêu cầu áp dụng.

## Expected Result

- Hệ thống từ chối áp dụng mã giảm giá do vi phạm điều kiện C4: Người dùng phải có JWT Token hợp lệ.
- Yêu cầu người dùng đăng nhập trước khi áp dụng mã giảm giá.

## Actual Result

Người dùng chưa đăng nhập vẫn vào được /checkout và áp dụng thành công mã BIGBUY: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 450,001 ₫". Vi phạm điều kiện C4.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-009.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ của điều kiện C4 (bảo mật xác thực người dùng).

## Status / Related Bugs

FAIL / DEF-FR09-03 — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
