# TC-PROFILE-WEB-016: Chưa đăng nhập không thể sửa hồ sơ

## Requirement ID

FR-04

## Module / Test Type / Technique

PROFILE-WEB / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Dùng tài khoản khách hàng A tại `http://localhost:5173`.

## Test Data

| Field | Value |
|---|---|
| Trang cần mở | `http://localhost:5173/profile` |

## Test Steps

1. Mở một cửa sổ riêng tư/ẩn danh mới, chưa đăng nhập EShop.
2. Nhập địa chỉ trong Test Data vào thanh địa chỉ và mở trang.
3. Quan sát có hồ sơ của người khác hoặc ô chỉnh sửa hay không. Nếu có form, thử nhập tên Khách thử và bấm Cập nhật.
4. Ghi thông báo và điều xảy ra; đóng cửa sổ riêng tư sau khi kiểm tra.

## Expected Result

- Yêu cầu đăng nhập hoặc chuyển đến trang đăng nhập; không cho khách chưa đăng nhập đọc/sửa hồ sơ cá nhân.

## Status / Related Bugs

Not Run / None
