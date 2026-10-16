# TC-COUPON-018: Thay đổi hoặc cập nhật lại giá trị đơn hàng sau khi đã áp dụng mã

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng đã đăng nhập.
- Đã áp dụng thành công mã `SAVE10` trên đơn hàng ban đầu `350,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `initial_total` | `350,000 ₫` |
| `new_total` | `200,000 ₫` (thay đổi giá trị đơn xuống dưới ngưỡng tối thiểu) |

## Test Steps

1. Áp dụng mã `SAVE10` thành công trên đơn hàng `350,000 ₫`.
2. Thay đổi số lượng sản phẩm trong giỏ (hoặc sửa đổi tổng tiền) khiến giá trị đơn giảm xuống `200,000 ₫`.

## Expected Result

- Hệ thống tự động hủy áp dụng mã giảm giá hoặc tính toán lại.
- Báo lỗi đơn hàng không còn đủ giá trị tối thiểu 300,000 ₫.
- Thành tiền quay về giá trị gốc của đơn hàng mới (`200,000 ₫`).

## Actual Result

Giao diện phản hồi chính xác: khi thay đổi tổng tiền, couponResult bị hủy, tổng tiền quay về giá trị gốc: "Tổng thanh toán: 200,000 ₫".

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-018.png)

## Coverage Rationale

Kiểm thử tính toàn vẹn dữ liệu khi có sự thay đổi trạng thái của biến phụ thuộc `cart_total`.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
