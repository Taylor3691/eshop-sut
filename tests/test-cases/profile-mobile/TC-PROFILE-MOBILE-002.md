# TC-PROFILE-MOBILE-002: Chấp nhận số điện thoại 10 chữ số

## Requirement ID

FR-04; FR-20

## Module / Test Type / Technique

PROFILE-MOBILE / Functional / BVA

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Mở ứng dụng EShop trên thiết bị di động đã được kết nối hệ thống. Dùng tài khoản A; chạm lời chào để mở Hồ sơ của bạn.

## Test Data

| Field | Value |
|---|---|
| Số điện thoại | `0912345678` |

## Test Steps

1. Đăng nhập A trên thiết bị, chạm lời chào để mở Hồ sơ của bạn. Ghi lại tên, số điện thoại, địa chỉ và email.
2. Xóa ô Số điện thoại rồi gõ `0912345678` bằng bàn phím trên thiết bị.
3. Giữ các ô khác; chạm Cập nhật, đọc và ghi lại thông báo. Nếu bàn phím chặn ký tự, ghi giá trị thực tế còn trong ô.
4. Chạm Thoát, đăng nhập lại A, mở hồ sơ và đối chiếu các ô.

## Expected Result

- Số `0912345678` được lưu đúng, giữ số 0 đầu và còn nguyên sau đăng nhập lại.
- Tên, địa chỉ và email không đổi.

## Status / Related Bugs

Not Run / None
