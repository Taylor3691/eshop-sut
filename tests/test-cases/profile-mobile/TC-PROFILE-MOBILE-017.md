# TC-PROFILE-MOBILE-017: Đăng xuất không giữ quyền sửa hồ sơ trước đó

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
| Tài khoản | `A` |

## Test Steps

1. Đăng nhập A, mở hồ sơ và ghi dữ liệu đang hiển thị.
2. Chạm Thoát. Dùng nút quay lại của thiết bị nếu có và thử mở lại hồ sơ từ màn hình chính.
3. Nếu form A còn hiện, thử sửa tên thành Sau đăng xuất và chạm Cập nhật.
4. Đăng nhập lại A, mở hồ sơ và đối chiếu dữ liệu trước khi thoát.

## Expected Result

- Sau Thoát không được sửa hồ sơ bằng phiên cũ; dữ liệu A không bị đổi bởi thao tác khi đã đăng xuất.

## Status / Related Bugs

Not Run / None
