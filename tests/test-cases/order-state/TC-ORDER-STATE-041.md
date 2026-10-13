# TC-ORDER-STATE-041: Xác nhận, giao hàng và hoàn thành một đơn

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
| Chủ đơn | `A — khách hàng` |

## Test Steps

1. Mở mục Đơn hàng trên trang quản trị; chọn đúng mã đơn của A đang Chờ xác nhận.
2. Bấm Xác nhận. Tải lại cả hai trang và kiểm tra đúng mã đơn đã thành Đã xác nhận.
3. Bấm Giao hàng trên đơn đó. Tải lại cả hai trang và kiểm tra trạng thái Đang giao.
4. Bấm Hoàn thành. Tải lại cả hai trang và kiểm tra trạng thái Đã giao.
5. Ở mỗi bước, kiểm tra thông tin đơn và đơn đối chiếu. Nếu một bước sai, dừng và ghi rõ các bước sau chưa chạy.

## Expected Result

- Cùng một đơn đi lần lượt qua Đã xác nhận → Đang giao → Đã giao; kết quả còn nguyên sau tải lại ở mỗi bước.
- Thông tin khác và đơn đối chiếu giữ nguyên.

## Status / Related Bugs

Not Run / None
