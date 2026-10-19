# [BUG][FR-01] Mobile chấp nhận Email rỗng hoặc sai định dạng khi đăng ký

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-REG-003`, `TC-REG-004`, `TC-REG-013`, `TC-REG-014`, `TC-REG-015`, `TC-REG-016`, `TC-REG-017`

## Các bước tái hiện

1. Mở màn hình Đăng ký Mobile.
2. Nhập Họ Tên và Mật khẩu hợp lệ.
3. Nhập Email rỗng hoặc sai định dạng, ví dụ `user.example.com`.
4. Gửi form đăng ký.

## Kết quả thực tế

Ứng dụng không chặn Email không hợp lệ trước khi gửi và tài khoản có thể được tạo.

## Kết quả mong đợi

Hệ thống từ chối đăng ký khi Email rỗng hoặc không đúng dạng `user@domain.com`.

## Đề xuất sửa

- Kiểm tra Email không rỗng và đúng định dạng tại Mobile để phản hồi sớm.
- Xác thực lại Email tại API trước khi ghi cơ sở dữ liệu; trả HTTP `400` khi sai.
- Bổ sung test cho Email rỗng, thiếu `@`, thiếu local-part, thiếu tên miền, có khoảng trắng và nhiều ký tự `@`.
