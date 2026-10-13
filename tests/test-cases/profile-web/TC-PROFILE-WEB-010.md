# TC-PROFILE-WEB-010: Từ chối số điện thoại không bắt đầu bằng 0

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
| Số điện thoại | `1912345678` |

## Test Steps

1. Đăng nhập A và mở Hồ sơ của bạn. Ghi lại Họ Tên, Số điện thoại, Địa chỉ và Email hiện tại.
2. Xóa nội dung ô Số điện thoại, nhập `1912345678`. Giữ nguyên các ô khác.
3. Bấm Cập nhật. Đọc và ghi lại thông báo; nếu có hộp thông báo, bấm OK để đóng.
4. Tải lại trang bằng F5. Đọc lại Số điện thoại và các ô khác.
5. Đăng xuất rồi đăng nhập lại A, mở Hồ sơ của bạn và kiểm tra lần nữa.

## Expected Result

- Số điện thoại không hợp lệ không được lưu; sau tải lại và đăng nhập lại vẫn là số cũ.
- Có thông báo từ chối; chấp nhận cả hộp thông báo của trình duyệt, không yêu cầu đúng một câu chữ.
- Họ Tên, Địa chỉ và Email không bị đổi.

## Status / Related Bugs

Not Run / None
