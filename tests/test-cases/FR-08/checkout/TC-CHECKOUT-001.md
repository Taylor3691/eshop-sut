# TC-CHECKOUT-001: Checkout thành công và tính tổng từ giỏ hàng

## Requirement ID

FR-08.1, FR-08.2, FR-08.4, FR-08.5

## Module / Test Type / Technique

CHECKOUT / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản khách hàng thử nghiệm và đăng nhập.
- Giỏ hàng có P1 giá 100000 ₫, số lượng 1 và P2 giá 50000 ₫, số lượng 3.
- Ghi nhận giỏ hàng trước khi checkout; tổng kỳ vọng là 250000 ₫.

## Test Data

| Field | Value |
|---|---|
| P1 | Giá 100000 ₫ × 1 |
| P2 | Giá 50000 ₫ × 3 |
| Tổng giỏ hàng | 250000 ₫ |
| Client `total_amount` (nếu gọi API) | 250000 |

## Test Steps

1. Mở trang checkout và đối chiếu giỏ hàng với dữ liệu chuẩn bị.
2. Xác nhận checkout theo luồng UI hoặc gửi `POST /api/checkout` với token hợp lệ.
3. Mở lịch sử/chi tiết đơn và kiểm tra tổng tiền.
4. Tải lại trang giỏ hàng hoặc truy vấn API cart để kiểm tra trạng thái sau checkout.

## Expected Result

- Checkout thành công tạo đơn.
- Tổng đơn bằng 250000 ₫, được tính từ giỏ hàng.
- Giỏ hàng rỗng sau khi checkout thành công.

## Status / Related Bugs

Not Run / None
