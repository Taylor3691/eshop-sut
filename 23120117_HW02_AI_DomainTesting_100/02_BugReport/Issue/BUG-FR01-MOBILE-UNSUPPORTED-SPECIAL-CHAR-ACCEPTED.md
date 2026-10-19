# [BUG][FR-01] Mobile chấp nhận ký tự đặc biệt ngoài tập cho phép trong Mật khẩu

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-REG-018`

## Các bước tái hiện

1. Mở màn hình Đăng ký Mobile.
2. Nhập Họ Tên và Email hợp lệ, chưa tồn tại.
3. Nhập Mật khẩu `Abcdef1#`.
4. Gửi form đăng ký.

## Kết quả thực tế

Mật khẩu được chấp nhận và đăng ký vẫn có thể thành công.

## Kết quả mong đợi

Hệ thống từ chối đăng ký vì `#` không thuộc tập ký tự đặc biệt `@`, `$`, `!`, `%`, `*`, `?`, `&` được FR-01 cho phép.

## Đề xuất sửa

- Chỉ chấp nhận đúng tập ký tự đặc biệt được FR-01 quy định.
- Đồng bộ validation tại Mobile và backend.
- Bổ sung test hồi quy cho từng ký tự được phép và các ký tự ngoài tập như `#`.
