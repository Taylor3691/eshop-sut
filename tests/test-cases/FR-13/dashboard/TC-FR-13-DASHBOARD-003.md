# TC-FR-13-DASHBOARD-003: Doanh thu bằng 0 khi không có đơn đã giao

## Requirement ID

FR-13

## Module / Test Type / Technique

DASHBOARD / Functional / Equivalence Partitioning

## Preconditions

- Dùng môi trường test cô lập có đơn hàng nhưng không có đơn nào mang trạng thái `delivered`.
- Đăng nhập bằng tài khoản admin.

## Test Data

| Field | Value |
|---|---|
| Orders | Một hoặc nhiều đơn ở trạng thái không phải `delivered` |
| Delivered orders | 0 |
| Expected revenue | 0 ₫ |

## Test Steps

1. Kiểm tra trạng thái của tất cả đơn trong tập dữ liệu test.
2. Mở Dashboard.
3. Ghi nhận tổng doanh thu.

## Expected Result

- Tổng doanh thu hiển thị là 0 ₫ vì không có đơn `delivered` để cộng.
- Tổng số đơn vẫn phản ánh các đơn hiện có.

## Status / Related Bugs

Not Run / None
