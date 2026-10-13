# TC-PROFILE-MOBILE-030: Đăng nhập lại trên điện thoại tải hồ sơ vừa đổi trên trang web

## Requirement ID

FR-04; FR-20

## Module / Test Type / Technique

PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Mở ứng dụng EShop trên thiết bị di động đã được kết nối hệ thống. Dùng tài khoản A; chạm lời chào để mở Hồ sơ của bạn.
- Máy tính và điện thoại dùng cùng hệ thống và cùng tài khoản A.

## Test Data

| Field | Value |
|---|---|
| Họ Tên | `Đặng Thị Lan` |
| Số điện thoại | `09412345678` |
| Địa chỉ | `60 Đồng Khởi, Phường Bến Nghé, TP.HCM` |

## Test Steps

1. Đăng nhập A trên điện thoại, mở hồ sơ và ghi dữ liệu hiện tại.
2. Trên máy tính, mở http://localhost:5173 và đăng nhập chính tài khoản A. Mở hồ sơ, nhập ba giá trị Test Data rồi bấm Cập nhật.
3. Tải lại trang web và kiểm tra ba giá trị đã lưu. Nếu chưa lưu được, dừng và ghi Blocked vì chưa tạo được dữ liệu để thử việc tải trên điện thoại.
4. Trên điện thoại, chạm Thoát rồi đăng nhập lại A và mở hồ sơ.
5. So sánh ba ô cùng lời chào với các giá trị đã lưu trên trang web.

## Expected Result

- Sau đăng nhập lại, điện thoại hiển thị đúng hồ sơ mới của A và đúng Email.
- Không yêu cầu điện thoại tự đổi ngay khi phiên cũ còn mở.

## Status / Related Bugs

Not Run / None
