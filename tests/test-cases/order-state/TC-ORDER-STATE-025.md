# TC-ORDER-STATE-025: Khách hàng không được quản lý trạng thái đơn hàng

## Requirement ID

FR-12; FR-18; SEC-03

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- M chuẩn bị một đơn thử của A; ghi mã đơn và trạng thái hiện tại để đối chiếu sau khi A thử vào trang quản trị.
- Có tài khoản khách hàng A đăng nhập được ở trang mua hàng và tài khoản quản trị M để đối chiếu; mở cửa sổ riêng tư mới khi thử đăng nhập A vào trang quản trị.

## Test Data

| Field | Value |
|---|---|
| Tài khoản | `A — khách hàng` |
| Trang quản trị | `http://localhost:5174` |

## Test Steps

1. Mở trang quản trị trong cửa sổ riêng tư mới, chưa đăng nhập quản trị viên.
2. Nhập email/mật khẩu của A vào màn hình đăng nhập và bấm Đăng nhập.
3. Nếu vào được, tìm mục Đơn hàng và các nút thay đổi trạng thái; ghi nhận mọi quyền quản lý có thể dùng.
4. Dùng cửa sổ của M kiểm tra đơn thử vẫn có trạng thái cũ.

## Expected Result

- A không được vào chức năng quản trị hoặc thay đổi trạng thái đơn bằng quyền quản trị.
- Đơn thử giữ nguyên.

## Status / Related Bugs

Not Run / None
