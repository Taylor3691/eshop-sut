# TC-BVA-COUPON-017: Biên độ dài chuỗi mã giảm giá rỗng (code length = 0)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng đã đăng nhập và đang ở màn hình Checkout.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `""` (độ dài chuỗi bằng 0 ký tự) |
| `cart_total` | `500,000 ₫` |

## Test Steps

1. Để trống trường nhập mã giảm giá.
2. Nhấn nút "Áp dụng" (hoặc gửi request `{ code: "" }` đến API).

## Expected Result

- Hệ thống chặn gửi hoặc trả về lỗi: Vui lòng nhập mã giảm giá.
- Không thực hiện truy vấn và không giảm giá.

## Actual Result

Nút "Áp dụng" bị disabled (disabled=true), chặn gửi chuỗi rỗng lên server.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-017.png)

## Boundary Rationale

Kiểm tra biên độ dài tối thiểu của chuỗi mã giảm giá (`length = 0`), thuộc miền không hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
