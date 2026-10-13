# TC-ORDER-STATE-046: Khách hàng hủy đơn Chờ xác nhận

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
| Trạng thái ban đầu | `Chờ xác nhận` |
| Người thao tác | `A — chủ đơn` |

## Test Steps

1. Đăng nhập A, mở Hồ sơ của bạn và tìm đúng mã đơn ở Lịch sử đơn hàng.
2. Xác nhận trạng thái trong Test Data. Tìm nút Hủy đơn trên đúng dòng.
3. Nếu nút hoạt động, bấm Hủy đơn, xử lý hộp xác nhận nếu có và ghi thông báo. Nếu nút không có hoặc bị khóa, ghi rõ điều đó.
4. Tải lại cả trang quản trị và trang khách hàng. Tìm đúng mã đơn đã ghi và đối chiếu trạng thái.
5. Kiểm tra người đặt, tổng tiền và thông tin đơn còn hiển thị như trước; đơn đối chiếu không đổi.

## Expected Result

- Hủy thành công, trạng thái là Đã hủy trên cả hai trang sau tải lại.
- Đơn đối chiếu và thông tin khác không đổi.

## Status / Related Bugs

Not Run / None
