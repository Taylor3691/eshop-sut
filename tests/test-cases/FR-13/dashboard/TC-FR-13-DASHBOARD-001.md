# TC-FR-13-DASHBOARD-001: Doanh thu chỉ cộng các đơn đã giao

## Requirement ID

FR-13; related: FR-10 order statuses

## Module / Test Type / Technique

DASHBOARD / Functional / Equivalence Partitioning

## Preconditions

- Dùng môi trường test cô lập với tập đơn có thể kiểm kê đầy đủ.
- Đăng nhập bằng tài khoản admin.
- Chuẩn bị ít nhất một đơn `delivered` và một đơn ở trạng thái khác; ghi mã đơn và tổng tiền từng đơn.

## Test Data

| Field | Value |
|---|---|
| Delivered order A | `total_amount = 100000` |
| Delivered order B | `total_amount = 250000` |
| Non-delivered order | `total_amount = 70000`, trạng thái `pending` hoặc trạng thái khác `delivered` |
| Expected dashboard revenue | 350000 ₫ |

## Test Steps

1. Xác nhận các trạng thái và tổng tiền của ba đơn thử trong trang quản lý đơn.
2. Mở Dashboard bằng tài khoản admin.
3. Ghi nhận tổng doanh thu hiển thị và so sánh với tổng các đơn `delivered`.

## Expected Result

- Dashboard hiển thị doanh thu 350000 ₫.
- Đơn 70000 ₫ không ở trạng thái `delivered` không được cộng vào doanh thu.

## Status / Related Bugs

Not Run / None
