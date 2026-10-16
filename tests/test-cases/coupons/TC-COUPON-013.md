# TC-COUPON-013: Từ chối khi gửi mã giảm giá rỗng hoặc chỉ toàn khoảng trắng

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng đã đăng nhập và đang ở trang Checkout.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `""` (chuỗi rỗng) hoặc `"   "` |
| `cart_total` | `400,000 ₫` |

## Test Steps

1. Để trống ô nhập mã giảm giá (hoặc nhập toàn khoảng trắng).
2. Nhấn nút "Áp dụng" (hoặc gửi request API với `{ code: "" }`).

## Expected Result

- Hệ thống chặn gửi hoặc trả về thông báo lỗi: Vui lòng nhập mã giảm giá.
- Không thực hiện tính toán giảm giá.

## Actual Result

Nút "Áp dụng" bị disabled hoàn toàn trên giao diện khi chuỗi mã rỗng hoặc chỉ có khoảng trắng (disabled=true).

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-013.png)

## Coverage Rationale

Kiểm thử giá trị biên rỗng (empty/whitespace boundary) của trường mã giảm giá.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
