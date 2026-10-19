# [BUG][FR-01] Mobile chấp nhận Mật khẩu thiếu thành phần bắt buộc

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-BVA-FR01-004`, `TC-BVA-FR01-007`, `TC-BVA-FR01-010`, `TC-BVA-FR01-013`

## Các bước tái hiện

1. Mở màn hình Đăng ký Mobile.
2. Nhập Họ Tên và Email hợp lệ, chưa tồn tại.
3. Nhập lần lượt một trong các Mật khẩu sau:
   - `abcdef12!@$%` — thiếu chữ hoa;
   - `ABCDEF12!@$%` — thiếu chữ thường;
   - `ABcdefgh!@$%` — thiếu chữ số;
   - `ABcdefgh1234` — thiếu ký tự đặc biệt hợp lệ.
4. Gửi form đăng ký.

## Kết quả thực tế

Ứng dụng vẫn đăng ký thành công và chuyển người dùng tới trang Đăng nhập ở cả bốn trường hợp.

## Kết quả mong đợi

Hệ thống từ chối đăng ký khi Mật khẩu thiếu bất kỳ thành phần bắt buộc nào: chữ hoa, chữ thường, chữ số hoặc ký tự đặc biệt hợp lệ.

## Đề xuất sửa

- Đối chiếu bundle Mobile đang chạy và bảo đảm validation Mật khẩu được áp dụng trước khi gọi API.
- Kiểm tra lại quy tắc tương tự tại backend; không tin cậy riêng validation phía Mobile.
- Thêm regression test cho bốn trường hợp thiếu thành phần Mật khẩu.
