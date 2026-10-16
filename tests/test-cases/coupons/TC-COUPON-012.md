# TC-COUPON-012: Xử lý chuẩn hóa mã giảm giá chữ thường và khoảng trắng (Normalizing Input Domain)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` hợp lệ trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `  save10  ` (chữ thường kèm khoảng trắng đầu/cuối) |
| `cart_total` | `500,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps

1. Tại trang Checkout, nhập chuỗi `  save10  ` vào ô mã giảm giá.
2. Nhấn nút "Áp dụng".

## Expected Result

- Hệ thống tự động cắt tỉa khoảng trắng (trim) và chuyển thành chữ in hoa (`SAVE10`).
- Áp dụng thành công mã `SAVE10` và giảm giá `50,000 ₫`.

## Actual Result

Frontend tự động trim và uppercase mã trước khi gửi API, áp dụng thành công: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫".

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-012.png)

## Coverage Rationale

Kiểm thử tính tương đương của miền nhập liệu chuỗi ký tự (chữ hoa, chữ thường và khoảng trắng thừa).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
