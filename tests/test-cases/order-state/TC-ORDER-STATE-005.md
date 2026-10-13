# TC-ORDER-STATE-005: Quản trị viên hủy đơn Đã xác nhận

## Requirement ID

FR-10; FR-18

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Mở trang khách hàng `http://localhost:5173/profile` và trang quản trị `http://localhost:5174` trong hai cửa sổ riêng. Dùng A ở trang khách hàng và M ở trang quản trị.
- Chuẩn bị một đơn thử ở trạng thái được ghi trong Test Data; ghi mã đơn, người đặt, tổng tiền và các thông tin đang hiển thị. Ghi thêm một đơn khác để đối chiếu.

## Test Data

| Field | Value |
|---|---|
| Trạng thái ban đầu | `Đã xác nhận` |
| Trạng thái muốn chuyển | `Đã hủy` |
| Người thao tác | `M — quản trị viên` |

## Test Steps

1. Mở mục Đơn hàng trên trang quản trị, tìm đúng mã đơn thử và xác nhận trạng thái ban đầu.
2. Bấm Hủy trên đúng dòng đơn.
3. Tải lại cả trang quản trị và trang khách hàng. Tìm đúng mã đơn đã ghi và đối chiếu trạng thái.
4. Kiểm tra người đặt, tổng tiền và thông tin đơn còn hiển thị như trước; đơn đối chiếu không đổi.

## Expected Result

- Đơn chuyển sang Đã hủy và vẫn đúng sau tải lại.
- Thông tin khác và đơn đối chiếu không đổi.

## Status / Related Bugs

Not Run / None
