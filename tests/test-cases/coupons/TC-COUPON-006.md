# TC-COUPON-006: Từ chối mã giảm giá không tồn tại trong hệ thống (Condition C1 Invalid)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `KHONGTONTAI` không tồn tại trong bảng `coupons`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `KHONGTONTAI` |
| `cart_total` | `500,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Tại trang Checkout, nhập mã `KHONGTONTAI`.
2. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống từ chối do vi phạm điều kiện C1 (mã không tồn tại).
- Hiển thị thông báo lỗi: Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa.
- Không áp dụng giảm giá.

## Actual Result

Từ chối chính xác với thông báo: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa".

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-006.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ của điều kiện C1 (mã không tồn tại trong cơ sở dữ liệu).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
