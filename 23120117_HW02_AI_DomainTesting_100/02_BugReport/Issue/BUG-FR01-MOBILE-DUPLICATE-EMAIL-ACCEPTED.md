# [BUG][FR-01] Mobile cho phép đăng ký bằng Email đã tồn tại

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-REG-005`

## Các bước tái hiện

1. Bảo đảm Email kiểm thử đã tồn tại trong cơ sở dữ liệu.
2. Mở màn hình Đăng ký Mobile.
3. Nhập Họ Tên và Mật khẩu hợp lệ, dùng lại Email đã tồn tại.
4. Gửi form đăng ký.

## Kết quả thực tế

Tài khoản vẫn được tạo và ứng dụng chuyển tới trang Đăng nhập.

## Kết quả mong đợi

Hệ thống từ chối đăng ký vì Email phải là duy nhất.

## Đề xuất sửa

- Kiểm tra Email đã tồn tại tại API trước khi tạo tài khoản và trả HTTP `409` hoặc `400`.
- Thêm ràng buộc `UNIQUE` cho cột Email trong cơ sở dữ liệu.
- Bổ sung test Mobile/API cho trường hợp Email trùng.
