# TC-CHECKOUT-005: Tổng tiền không thể chỉnh trực tiếp trên giao diện

## Requirement ID

FR-08.2

## Module / Test Type / Technique

CHECKOUT UI / Functional / Equivalence Partitioning

## Preconditions

- Đăng nhập và có ít nhất một sản phẩm trong giỏ hàng.
- Ghi nhận đơn giá, số lượng và tổng được hiển thị trong giỏ.

## Test Data

| Field | Value |
|---|---|
| Cart | Một hoặc nhiều sản phẩm thử |
| Expected total | Tổng giá × số lượng của các dòng hàng |

## Test Steps

1. Mở trang checkout.
2. Kiểm tra tổng tiền được hiển thị.
3. Thử tương tác với vùng tổng tiền bằng các thao tác UI thông thường.

## Expected Result

- Tổng tiền được tính tự động từ giỏ hàng.
- Người dùng không thể sửa trực tiếp tổng tiền bằng giao diện.

## Status / Related Bugs

Not Run / None
