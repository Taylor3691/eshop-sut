# [BUG][FR-01] Mobile không kiểm tra Họ Tên bắt buộc khi đăng ký

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-REG-002`, `TC-REG-012`, `TC-BVA-FR01-016`

## Các bước tái hiện

1. Mở màn hình Đăng ký trên ứng dụng Mobile.
2. Để trống Họ Tên hoặc chỉ nhập khoảng trắng.
3. Nhập Email chưa tồn tại và Mật khẩu hợp lệ.
4. Gửi form đăng ký.

## Kết quả thực tế

Tài khoản vẫn được tạo và ứng dụng chuyển tới trang Đăng nhập.

## Kết quả mong đợi

Hệ thống từ chối đăng ký vì Họ Tên là trường bắt buộc.

## Đề xuất sửa

- Trim Họ Tên và chặn giá trị rỗng hoặc chỉ có khoảng trắng trước khi gửi form.
- Kiểm tra lại tại API đăng ký và trả HTTP `400` khi Họ Tên không hợp lệ.
- Bổ sung test hồi quy cho Họ Tên rỗng, chỉ khoảng trắng và hợp lệ.
