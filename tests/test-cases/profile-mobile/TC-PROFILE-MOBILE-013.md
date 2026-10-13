# TC-PROFILE-MOBILE-013: Lưu đồng thời Họ Tên, Số điện thoại và Địa chỉ

## Requirement ID

FR-04; FR-20

## Module / Test Type / Technique

PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Mở ứng dụng EShop trên thiết bị di động đã được kết nối hệ thống. Dùng tài khoản A; chạm lời chào để mở Hồ sơ của bạn.

## Test Data

| Field | Value |
|---|---|
| Họ Tên | `Lê Thị Mai` |
| Số điện thoại | `09123456789` |
| Địa chỉ | `35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM` |

## Test Steps

1. Đăng nhập A, mở hồ sơ và ghi Email cùng ba ô đang có.
2. Nhập ba giá trị Test Data và chạm Cập nhật.
3. Ghi thông báo và các ô đang hiển thị.
4. Chạm Thoát, đăng nhập lại A, mở hồ sơ và kiểm tra đủ ba ô.

## Expected Result

- Cả ba giá trị mới được lưu đúng, đặc biệt Địa chỉ vẫn còn sau đăng nhập lại.
- Email giữ nguyên. Thông báo thành công một mình chưa đủ để đánh Pass.

## Status / Related Bugs

Not Run / None
