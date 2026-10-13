# TC-PROFILE-MOBILE-014: Email không sửa được bằng gõ hoặc dán

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
| Email thử nhập | `changed.mobile@example.com` |

## Test Steps

1. Đăng nhập A và mở hồ sơ; ghi Email hiện tại.
2. Chạm ô Email, thử xóa/gõ/dán email trong Test Data.
3. Nếu sửa được, chạm Cập nhật và ghi kết quả.
4. Chạm Thoát, đăng nhập lại A và đọc Email.

## Expected Result

- Không thay đổi được Email; sau đăng nhập lại vẫn là tài khoản A.

## Status / Related Bugs

Not Run / None
