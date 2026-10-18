# TC-FR-08-CHECKOUT-004: Bỏ qua client total lớn hơn tổng giỏ hàng

## Requirement ID

FR-08.4

## Module / Test Type / Technique

CHECKOUT API / Functional / Equivalence Partitioning

## Preconditions

- Đăng nhập bằng tài khoản thử nghiệm và lấy token của tài khoản đó.
- Giỏ hàng có P1 giá 100000 ₫, số lượng 2; tổng đúng là 200000 ₫.
- Ghi nhận số lượng đơn trước khi thử.

## Test Data

| Field | Value |
|---|---|
| Tổng tính từ giỏ hàng | 200000 |
| Client `total_amount` | 9999999 |
| Authorization | Bearer token hợp lệ |

## Test Steps

1. Gửi `POST /api/checkout` với token hợp lệ và `total_amount=9999999`.
2. Kiểm tra response và đơn mới trong lịch sử/chi tiết đơn.
3. So sánh tổng đơn với tổng tính từ giỏ hàng.

## Expected Result

- Backend không dùng giá trị `total_amount=9999999` do client gửi.
- Nếu checkout thành công, tổng đơn phải là 200000 ₫ theo giỏ hàng; nếu request bị từ chối thì không có đơn với tổng giả mạo.

## Status / Related Bugs

Not Run / None
