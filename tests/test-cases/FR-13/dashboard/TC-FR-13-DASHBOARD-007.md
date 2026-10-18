# TC-FR-13-DASHBOARD-007: Hiển thị 0 doanh thu và 0 đơn khi chưa có đơn

## Requirement ID

FR-13

## Module / Test Type / Technique

DASHBOARD / Functional / Equivalence Partitioning (empty collection)

## Preconditions

- Dùng môi trường test cô lập trong đó không có đơn hàng.
- Đăng nhập bằng tài khoản admin.

## Test Data

| Field | Value |
|---|---|
| Order collection | Empty |
| Expected revenue | 0 ₫ (sum over no delivered orders) |
| Expected order count | 0 |

## Test Steps

1. Xác nhận tập dữ liệu test không có đơn hàng.
2. Mở Dashboard bằng admin.
3. Ghi nhận tổng doanh thu và tổng số đơn.

## Expected Result

- Doanh thu hiển thị là 0 ₫.
- Tổng số đơn hiển thị là 0.
- Nếu hệ thống hiển thị empty state thay vì số 0, ghi actual và xin xác nhận expected; README chưa mô tả presentation của tập rỗng.

## Status / Related Bugs

Not Run / None
