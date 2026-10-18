# TC-FR-13-DASHBOARD-006: Chỉ cộng delivered, loại trừ từng trạng thái đơn còn lại

## Requirement ID

FR-13; related statuses: FR-10 / FR-18

## Module / Test Type / Technique

DASHBOARD / Functional / Equivalence Partitioning

## Preconditions

- Dùng môi trường test cô lập có thể kiểm kê toàn bộ đơn.
- Đăng nhập bằng tài khoản admin.
- Chuẩn bị một đơn thử cho mỗi trạng thái trong Test Data; ghi order ID, amount và trạng thái.

## Test Data

| Order status | `total_amount` |
|---|---:|
| delivered | 100000 |
| pending | 11000 |
| confirmed | 12000 |
| shipping | 13000 |
| canceled | 14000 |
| Expected revenue | 100000 ₫ |
| Expected order count | 5 |

## Test Steps

1. Xác nhận mỗi đơn thử có đúng status và amount trong bảng.
2. Mở Dashboard bằng admin và tải dữ liệu.
3. Ghi nhận doanh thu và tổng số đơn.
4. Đối chiếu doanh thu với delivered duy nhất; đối chiếu count với cả năm đơn.

## Expected Result

- Doanh thu chỉ là 100000 ₫; bốn trạng thái còn lại không được cộng.
- Tổng số đơn là 5, tính mọi trạng thái.

## Status / Related Bugs

Not Run / None
