# TC-PROFILE-MOBILE-018: Đổi tài khoản rồi lưu đúng hồ sơ của người vừa đăng nhập

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
| Tài khoản | `A rồi B` |
| Tên mới của B | `Phạm Văn Minh` |
| Số điện thoại mới của B | `0961234567` |
| Địa chỉ mới của B | `50 Pasteur, Phường Bến Nghé, TP.HCM` |

## Test Steps

1. Lần lượt đăng nhập A và B, mở hồ sơ, ghi dữ liệu mỗi người. Kết thúc bước này bằng cách đăng nhập lại A.
2. Chạm Thoát, đăng nhập B và mở hồ sơ. Kiểm tra Email cùng các ô thuộc B trước khi sửa.
3. Nhập ba giá trị mới của B theo Test Data rồi chạm Cập nhật.
4. Chạm Thoát, đăng nhập lại B và kiểm tra dữ liệu đã lưu.
5. Chạm Thoát, đăng nhập lại A và xác nhận dữ liệu A giữ nguyên.

## Expected Result

- Form đổi sang đúng tài khoản B ngay khi đăng nhập B.
- Chỉ B lưu ba giá trị mới; A không đổi, Email của từng người giữ nguyên.

## Status / Related Bugs

Not Run / None
