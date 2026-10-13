# TC-PROFILE-MOBILE-016: Chưa đăng nhập không thể sửa hồ sơ

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
| Phiên | `Chưa đăng nhập` |

## Test Steps

1. Nếu đang đăng nhập, mở hồ sơ và chạm Thoát.
2. Từ màn hình chính, chạm vị trí Đăng nhập/lời chào để thử mở hồ sơ.
3. Quan sát màn hình. Nếu thấy form sửa hồ sơ khi chưa đăng nhập, thử nhập tên Khách thử và chạm Cập nhật.

## Expected Result

- Yêu cầu đăng nhập; không hiển thị hoặc cho sửa hồ sơ cá nhân của tài khoản khác.

## Status / Related Bugs

Not Run / None
