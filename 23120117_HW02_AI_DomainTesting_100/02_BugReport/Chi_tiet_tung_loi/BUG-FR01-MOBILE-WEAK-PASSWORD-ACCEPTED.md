---
name: Bug Report
title: "[BUG]: Mobile chấp nhận Mật khẩu thiếu thành phần bắt buộc"
labels: ["type: bug", "status: Open", "platform: mobile"]
---

## Mô tả lỗi
Ứng dụng Mobile cho phép đăng ký bằng Mật khẩu thiếu chữ hoa, chữ thường, chữ số hoặc ký tự đặc biệt hợp lệ. Hành vi này vi phạm yêu cầu mật khẩu mạnh của FR-01.

Test case phát hiện: `TC-BVA-FR01-004`, `TC-BVA-FR01-007`, `TC-BVA-FR01-010`, `TC-BVA-FR01-013`.

## Môi trường
- Nền tảng: React Native với Expo
- Thành phần: Màn hình Đăng ký Mobile
- API: `POST /api/register`
- Trạng thái: Cần bổ sung thông tin thiết bị, phiên bản hệ điều hành và thời điểm chạy khi tạo GitHub Issue

## Steps to reproduce
1. Mở màn hình Đăng ký Mobile.
2. Nhập Họ Tên và Email hợp lệ, chưa tồn tại.
3. Nhập một trong các Mật khẩu sau:
   - `abcdef12!@$%` - thiếu chữ hoa;
   - `ABCDEF12!@$%` - thiếu chữ thường;
   - `ABcdefgh!@$%` - thiếu chữ số;
   - `ABcdefgh1234` - thiếu ký tự đặc biệt hợp lệ.
4. Gửi form đăng ký.

## Actual result
Ứng dụng vẫn đăng ký thành công và chuyển người dùng tới trang Đăng nhập ở cả bốn trường hợp.

## Expected result
Hệ thống từ chối đăng ký khi Mật khẩu thiếu bất kỳ thành phần bắt buộc nào của FR-01.

## Phân tích kỹ thuật
Mã nguồn hiện tại có biểu thức chính quy kiểm tra các thành phần Mật khẩu, nhưng Actual Result của bốn test case cho thấy bản Mobile được kiểm thử không thực thi hoặc không áp dụng đúng kiểm tra này. Cần đối chiếu phiên bản ứng dụng, bundle đang chạy và đường gọi `handleRegister` khi tái hiện lỗi.
