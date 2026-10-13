# TC-PROFILE-WEB-015: Email không được phép thay đổi

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
| Email muốn thử nhập | `changed.a@example.com` |

## Test Steps

1. Đăng nhập A và mở Hồ sơ của bạn; ghi lại Email đang hiển thị.
2. Bấm vào ô Email, thử xóa, gõ hoặc dán email trong Test Data.
3. Nếu thay được, bấm Cập nhật; ghi lại điều đã xảy ra.
4. Tải lại trang, đăng xuất rồi đăng nhập A và kiểm tra Email.

## Expected Result

- Email không sửa được và vẫn đúng tài khoản A sau khi mở lại.
- Không đánh giá kiểu kỹ thuật của ô nhập trong case này.

## Status / Related Bugs

Not Run / None
