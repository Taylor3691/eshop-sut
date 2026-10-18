# TC-CHECKOUT-007: Giỏ hàng được xóa sau checkout thành công

## Requirement ID

FR-08.5

## Module / Test Type / Technique

CHECKOUT / Functional / State Transition

## Preconditions

- Đăng nhập; giỏ hàng có ít nhất một sản phẩm.
- Ghi nhận các dòng hàng trước checkout.
- Có thể hoàn tất checkout thành công.

## Test Data

| Field | Value |
|---|---|
| Cart | Một dòng hàng thử, số lượng 1 trở lên |
| Initial state | Cart có sản phẩm |
| Expected state after success | Cart rỗng |

## Test Steps

1. Thực hiện checkout thành công.
2. Chờ xác nhận thành công.
3. Tải lại trang giỏ hàng hoặc truy vấn API cart.

## Expected Result

- Cart không còn các sản phẩm đã checkout.

## Status / Related Bugs

Not Run / None
