# [BUG][FR-01] Form đăng ký từ chối mật khẩu mạnh hợp lệ

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-BVA-FR01-002`, `TC-BVA-FR01-003`, `TC-BVA-FR01-005`, `TC-BVA-FR01-006`, `TC-BVA-FR01-008`, `TC-BVA-FR01-009`, `TC-BVA-FR01-011`, `TC-BVA-FR01-012`, `TC-BVA-FR01-014`, `TC-BVA-FR01-015`, `TC-REG-001`

## Các bước tái hiện

1. Mở trang Đăng ký tại `http://localhost:5173`.
2. Nhập Họ Tên và một Email chưa tồn tại.
3. Nhập Mật khẩu hợp lệ theo FR-01, ví dụ `Abcdef1@`.
4. Bấm **Đăng Ký**.

## Kết quả thực tế

- Frontend hiển thị thông báo Mật khẩu yếu.
- Không phát sinh `POST /api/register`; Cypress hết thời gian chờ request đăng ký.
- Các Mật khẩu hợp lệ chứa ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` đều bị chặn ở frontend.

## Kết quả mong đợi

Mật khẩu dài tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số và ít nhất một ký tự đặc biệt hợp lệ phải được chấp nhận. Hệ thống gửi request đăng ký và chuyển người dùng tới trang Đăng nhập khi thành công.

## Đề xuất sửa

- Sửa regex frontend để dùng đúng tập ký tự đặc biệt `(?=.*[@$!%*?&])`, không yêu cầu khoảng trắng.
- Thực hiện quy tắc validation tương tự tại backend và trả HTTP `400` khi Mật khẩu không hợp lệ.
- Bổ sung unit test cho từng điều kiện Mật khẩu và regression test cho toàn bộ testcase liên quan.
