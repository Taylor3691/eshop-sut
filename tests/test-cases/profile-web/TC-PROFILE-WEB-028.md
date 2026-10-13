# TC-PROFILE-WEB-028: Cập nhật đồng thời Họ Tên, Số điện thoại và Địa chỉ

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
| Họ Tên | `Nguyễn Thị An` |
| Số điện thoại | `0912345678` |
| Địa chỉ | `45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM` |

## Test Steps

1. Đăng nhập A, mở Hồ sơ của bạn và ghi Email cùng ba giá trị đang có.
2. Nhập ba giá trị trong Test Data vào đúng ô; bấm Cập nhật.
3. Ghi lại thông báo và các giá trị đang hiển thị.
4. Tải lại trang bằng F5, kiểm tra cả ba ô.
5. Đăng xuất rồi đăng nhập lại A, mở hồ sơ và đối chiếu lần nữa.

## Expected Result

- Cả ba giá trị được lưu đúng và còn nguyên sau tải lại/đăng nhập lại.
- Email của A giữ nguyên.

## Status / Related Bugs

Not Run / None
