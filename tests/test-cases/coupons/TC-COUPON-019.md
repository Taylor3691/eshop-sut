# TC-COUPON-019: Từ chối mã khi đồng thời vi phạm nhiều điều kiện (C2 Invalid + C3 Invalid)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `EXPIRED` vừa hết hạn (C2 = False), vừa có đơn hàng chỉ `50,000 ₫` dưới ngưỡng `100,000 ₫` (C3 = False).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `EXPIRED` |
| `cart_total` | `50,000 ₫` |

## Test Steps

1. Tại trang Checkout với giỏ hàng `50,000 ₫`, nhập mã `EXPIRED`.
2. Nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng mã và hiển thị thông báo lỗi phù hợp (ưu tiên thông báo mã hết hạn hoặc không đủ điều kiện tối thiểu).
- Không áp dụng giảm giá.

## Actual Result

Từ chối chính xác: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Ưu tiên kiểm tra ngưỡng đơn hàng tối thiểu trước khi xét ngày hết hạn.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-019.png)

## Coverage Rationale

Kiểm thử tổ hợp vi phạm đồng thời nhiều điều kiện đầu vào (đa điều kiện thất bại).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
