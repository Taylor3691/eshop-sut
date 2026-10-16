# TC-COUPON-020: Xác thực tính toàn vẹn số tiền thanh toán phía Backend khi gọi API Checkout

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng đã đăng nhập với JWT Token hợp lệ.
- Giỏ hàng có sản phẩm với tổng tiền thực tế là `500,000 ₫`.
- Áp dụng mã giảm giá `BIGBUY` (giảm 50,000 ₫), số tiền thanh toán đúng phải là `450,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `coupon_id` | ID của `BIGBUY` |
| `tampered_total` | `100,000 ₫` (giá trị cố tình bị chỉnh sửa sai lệch từ client gửi lên API `/api/checkout`) |

## Test Steps

1. Gửi request `POST /api/checkout` kèm `coupon_id` nhưng sửa đổi `total_amount = 100000` thay vì `450000`.
2. Kiểm tra phản hồi API và tổng tiền đơn hàng được lưu trong bảng `orders`.

## Expected Result

- Backend tự động tính toán lại số tiền dựa trên giá sản phẩm thực tế trong giỏ và mã giảm giá hợp lệ.
- Backend không chấp nhận số tiền bị can thiệp trái phép từ client; giá trị lưu trong CSDL phải là `450,000 ₫`.

## Actual Result

Backend chấp nhận trực tiếp total_amount = 100000 ₫ bị can thiệp từ client mà không tự tính lại giá từ giỏ hàng và coupon.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-020.png)

## Coverage Rationale

Kiểm thử miền giá trị bảo mật và toàn vẹn nghiệp vụ theo ràng buộc FR-08/FR-09 (Backend tự tính lại tổng tiền thanh toán).

## Status / Related Bugs

FAIL / DEF-FR09-05 — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
