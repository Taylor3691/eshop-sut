# TC-FR-13-DASHBOARD-002: Tổng số đơn tính mọi trạng thái

## Requirement ID

FR-13

## Module / Test Type / Technique

DASHBOARD / Functional / Equivalence Partitioning

## Preconditions

- Dùng môi trường test cô lập hoặc ghi nhận chính xác số đơn nền trước khi tạo dữ liệu.
- Đăng nhập bằng tài khoản admin.
- Có thể chuẩn bị các đơn thử ở các trạng thái khác nhau.

## Test Data

| Field | Value |
|---|---|
| Baseline order count | Ghi nhận trước khi thêm dữ liệu |
| Added test orders | 3 đơn: `pending`, `delivered`, `canceled` |
| Expected total order count | Baseline + 3 |

## Test Steps

1. Ghi nhận baseline bằng nguồn dữ liệu test đã kiểm kê.
2. Tạo ba đơn thử và chuẩn bị trạng thái như Test Data.
3. Mở/tải lại Dashboard.
4. So sánh tổng số đơn hiển thị với baseline + 3.

## Expected Result

- Tổng số đơn tăng đúng 3 so với baseline.
- Các đơn được tính bất kể trạng thái.

## Status / Related Bugs

Not Run / None
