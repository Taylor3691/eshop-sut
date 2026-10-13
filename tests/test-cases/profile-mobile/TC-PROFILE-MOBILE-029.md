# TC-PROFILE-MOBILE-029: Hiển thị an toàn nội dung giống thẻ định dạng trong Địa chỉ giao hàng

## Requirement ID

FR-04; SEC-04; FR-20

## Module / Test Type / Technique

PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Mở ứng dụng EShop trên thiết bị di động đã được kết nối hệ thống. Dùng tài khoản A; chạm lời chào để mở Hồ sơ của bạn.

## Test Data

| Field | Value |
|---|---|
| Địa chỉ giao hàng | `<b>Địa chỉ thử</b>` |
| Số điện thoại hợp lệ | `0987654321` |

## Test Steps

1. Đăng nhập A trên ứng dụng, chạm lời chào để mở Hồ sơ của bạn. Ghi lại dữ liệu hiện tại.
2. Dán nguyên chuỗi `<b>Địa chỉ thử</b>` vào ô Địa chỉ giao hàng; giữ các ô khác như cũ và dùng số điện thoại hợp lệ trong Test Data.
3. Chạm Cập nhật và ghi phản hồi. Nếu không lưu được chuỗi cần thử, dừng và ghi Blocked kèm thông báo; chưa kiểm tra được cách hiển thị dữ liệu đã lưu.
4. Chạm Thoát rồi đăng nhập lại A và mở hồ sơ.
5. Quan sát ô Địa chỉ giao hàng.
6. Ghi/chụp kết quả; dùng form để trả lại dữ liệu cũ. Nếu không khôi phục được, ghi rõ tài khoản còn dữ liệu thử.

## Expected Result

- Khi chuỗi đã lưu được, nhìn thấy nguyên văn cả ký tự <b…> và </b>; chúng không biến thành thẻ định dạng làm mất nội dung chữ.
- Tên có dấu/địa chỉ không mất ký tự; số điện thoại đúng Test Data, các ô không sửa giữ dữ liệu đã ghi.
- Nếu bị chặn trước khi lưu/hiển thị lại, không ghi Pass cho khả năng hiển thị an toàn. Đây chỉ là kiểm tra bằng mắt trên những vị trí đã nêu.

## Status / Related Bugs

Not Run / None
