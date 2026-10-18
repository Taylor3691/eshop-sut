# TC-CHECKOUT-006: Hiển thị đầy đủ sản phẩm trong checkout

## Requirement ID

FR-08.3

## Module / Test Type / Technique

CHECKOUT UI / Functional / Equivalence Partitioning

## Preconditions

- Đăng nhập và thêm hai sản phẩm khác nhau vào giỏ hàng.
- P1 có số lượng 1; P2 có số lượng 3.
- Ghi nhận tên và số lượng trong giỏ trước khi mở checkout.

## Test Data

| Field | Value |
|---|---|
| Cart item 1 | P1 × 1 |
| Cart item 2 | P2 × 3 |

## Test Steps

1. Mở trang checkout.
2. Đối chiếu các sản phẩm hiển thị với giỏ hàng.
3. Kiểm tra tên và số lượng từng sản phẩm.

## Expected Result

- Tất cả sản phẩm đặt mua đều hiển thị.
- Tên và số lượng hiển thị khớp với giỏ hàng.

## Status / Related Bugs

Not Run / None
