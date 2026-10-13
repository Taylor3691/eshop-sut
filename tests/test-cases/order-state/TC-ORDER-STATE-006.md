# TC-ORDER-STATE-006: Không cho chuyển đơn Chờ xác nhận sang Đang giao

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
| Trạng thái muốn chuyển | `Đang giao` |
| Người thao tác | `M — quản trị viên` |

## Test Steps

1. Mở mục Đơn hàng trên trang quản trị, tìm đúng mã đơn thử và xác nhận trạng thái ban đầu.
2. Tìm thao tác chuyển sang Đang giao (nút Giao hàng). Nếu không có hoặc bị vô hiệu hóa, ghi nhận không thể thực hiện; không tìm cách sửa trang để hiện nút. Nếu nút hoạt động, bấm và ghi phản hồi.
3. Tải lại cả trang quản trị và trang khách hàng. Tìm đúng mã đơn đã ghi và đối chiếu trạng thái.
4. Kiểm tra người đặt, tổng tiền và thông tin đơn còn hiển thị như trước; đơn đối chiếu không đổi.

## Expected Result

- Không thể chuyển sang Đang giao; đơn vẫn Chờ xác nhận.
- Có thể không có nút, nút không bấm được hoặc hệ thống báo lỗi khi bấm. Chỉ kết luận cho thao tác qua trang đang thử.
- Thông tin khác và đơn đối chiếu không đổi.

## Status / Related Bugs

Not Run / None
