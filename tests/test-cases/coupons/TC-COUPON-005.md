# TC-COUPON-005: Từ chối mã giảm giá khi tổng đơn hàng thấp hơn ngưỡng tối thiểu 1 đơn vị (Boundary total < min_order_amount)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` yêu cầu `min_order_amount = 300,000 ₫`.
- Đơn hàng hiện tại có tổng tiền `299,000 ₫` (nhỏ hơn ngưỡng tối thiểu).

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `299,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Đăng nhập và tạo đơn hàng có giá trị `299,000 ₫`.
2. Mở trang Checkout.
3. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result

- Hệ thống từ chối áp dụng mã do vi phạm điều kiện C3.
- Hiển thị thông báo lỗi nêu rõ đơn hàng chưa đạt giá trị tối thiểu 300,000 ₫.
- Số tiền giảm giá bằng 0 ₫; tổng tiền giữ nguyên `299,000 ₫`.

## Actual Result

Từ chối chính xác: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Không áp dụng giảm giá cho đơn hàng dưới 300,000 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-005.png)

## Coverage Rationale

Kiểm thử giá trị biên ngay dưới ngưỡng tối thiểu (`min_order_amount - 1`), kiểm tra việc thực thi điều kiện C3.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
