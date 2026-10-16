# TC-COUPON-017: Ghi nhận lịch sử sử dụng mã giảm giá sau khi thanh toán thành công

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Áp dụng thành công mã `SAVE10` trên đơn hàng `500,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| Thao tác | Nhấn nút "Xác Nhận Thanh Toán" |

## Test Steps

1. Tại màn hình Checkout, áp dụng thành công mã `SAVE10`.
2. Điền thông tin giao hàng và nhấn "Xác Nhận Thanh Toán".
3. Kiểm tra cơ sở dữ liệu bảng `coupon_usage` sau khi nhận thông báo thanh toán thành công.

## Expected Result

- Đơn hàng được tạo thành công với số tiền đã giảm.
- Bảng `coupon_usage` được thêm 1 bản ghi mới với `coupon_id` tương ứng và `user_id` của `test@eshop.com`.
- Số lần sử dụng mã của người dùng tăng lên 1.

## Actual Result

Thanh toán thành công qua UI, bản ghi coupon_usage được chèn vào CSDL (1 lượt ghi nhận cho BIGBUY).

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-017.png)

## Coverage Rationale

Kiểm thử chu trình nghiệp vụ hoàn tất: kích hoạt chuyển trạng thái và cập nhật biến đếm sử dụng cho điều kiện C5.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
