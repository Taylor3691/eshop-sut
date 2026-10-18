# TC-FR-08-CHECKOUT-009: Backend tính lại tổng sau khi giỏ hàng thay đổi

## Requirement ID

FR-08.2, FR-08.4

## Module / Test Type / Technique

CHECKOUT API / Functional / Equivalence Partitioning (cross-variable interaction)

## Preconditions

- Đăng nhập bằng tài khoản thử và chuẩn bị cart có thể thay đổi trước checkout.
- Có thể quan sát giá và số lượng hiện tại của cart cùng tổng đã lưu của order.
- Ghi lại tổng cart ban đầu.

## Test Data

| Field | Value |
|---|---|
| Initial cart | P1: 100000 ₫ × 1; displayed total: 100000 ₫ |
| Cart after change | P1: 100000 ₫ × 1 and P2: 50000 ₫ × 1 |
| Current cart total | 150000 ₫ |
| Stale client `total_amount` | 100000 |

## Test Steps

1. Tạo cart ban đầu với P1 và ghi nhận tổng 100000 ₫.
2. Trước khi checkout, thêm P2 để tổng cart hiện tại thành 150000 ₫.
3. Gửi checkout request với tổng cũ 100000 hoặc thực hiện checkout từ luồng UI nếu client giữ tổng cũ.
4. Kiểm tra total của order được tạo và trạng thái cart sau đó.

## Expected Result

- Backend không dùng total cũ 100000 ₫ do client gửi.
- Nếu checkout thành công, order total là 150000 ₫ theo cart hiện tại; cart được xóa theo FR-08.5.

## Status / Related Bugs

Not Run / None
