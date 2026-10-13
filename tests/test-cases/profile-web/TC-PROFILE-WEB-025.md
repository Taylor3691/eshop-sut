# TC-PROFILE-WEB-025: Hiển thị an toàn nội dung giống thẻ định dạng trong Họ Tên

## Requirement ID

FR-04; SEC-04

## Module / Test Type / Technique

PROFILE-WEB / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Dùng tài khoản khách hàng A tại `http://localhost:5173`.

## Test Data

| Field | Value |
|---|---|
| Họ Tên | `<b data-profile-probe="name">Tên kiểm tra</b>` |
| Số điện thoại hợp lệ | `0987654321` |

## Test Steps

1. Đăng nhập A trên trang web và mở Hồ sơ của bạn. Ghi lại dữ liệu hiện tại.
2. Dán nguyên chuỗi `<b data-profile-probe="name">Tên kiểm tra</b>` vào ô Họ Tên; giữ các ô khác như cũ và dùng số điện thoại hợp lệ trong Test Data.
3. Bấm Cập nhật và ghi phản hồi. Nếu không lưu được chuỗi cần thử, dừng và ghi Blocked kèm thông báo; chưa kiểm tra được cách hiển thị dữ liệu đã lưu.
4. Đăng xuất rồi đăng nhập lại A; mở hồ sơ và tải lại trang.
5. Quan sát ô Họ Tên và lời chào ở đầu màn hình.
6. Ghi/chụp kết quả; dùng form để trả lại dữ liệu cũ. Nếu không khôi phục được, ghi rõ tài khoản còn dữ liệu thử.

## Expected Result

- Khi chuỗi đã lưu được, nhìn thấy nguyên văn cả ký tự <b…> và </b>; chúng không biến thành thẻ định dạng làm mất nội dung chữ.
- Tên có dấu/địa chỉ không mất ký tự; số điện thoại đúng Test Data, các ô không sửa giữ dữ liệu đã ghi.
- Nếu bị chặn trước khi lưu/hiển thị lại, không ghi Pass cho khả năng hiển thị an toàn. Đây chỉ là kiểm tra bằng mắt trên những vị trí đã nêu.

## Status / Related Bugs

Not Run / None
