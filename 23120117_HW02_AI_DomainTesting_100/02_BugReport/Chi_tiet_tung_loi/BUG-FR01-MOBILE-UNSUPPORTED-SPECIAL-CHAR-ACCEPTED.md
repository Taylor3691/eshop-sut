---
name: Bug Report
title: "[BUG]: Mobile chấp nhận ký tự đặc biệt ngoài tập cho phép trong Mật khẩu"
labels: ["type: bug", "status: Open", "platform: mobile"]
---

## Mô tả lỗi
Ứng dụng Mobile chấp nhận Mật khẩu có ký tự đặc biệt ngoài tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. Test case dùng ký tự `#` được ghi nhận Fail.

Test case phát hiện: `TC-REG-018`.

## Môi trường
- Nền tảng: React Native với Expo
- Thành phần: Màn hình Đăng ký Mobile
- Trạng thái: Cần bổ sung thông tin thiết bị, phiên bản hệ điều hành và thời điểm chạy khi tạo GitHub Issue

## Steps to reproduce
1. Mở màn hình Đăng ký Mobile.
2. Nhập Họ Tên và Email hợp lệ, chưa tồn tại.
3. Nhập Mật khẩu `Abcdef1#`.
4. Gửi form đăng ký.

## Actual result
Mật khẩu vượt qua kiểm tra phía Mobile vì biểu thức chính quy chấp nhận mọi ký tự không phải chữ hoặc số.

## Expected result
Hệ thống từ chối đăng ký vì `#` không thuộc tập ký tự đặc biệt được FR-01 cho phép.

## Phân tích kỹ thuật
Biểu thức `(?=.*[^A-Za-z\d])` trong `handleRegister` chấp nhận mọi ký tự đặc biệt. Biểu thức cần kiểm tra đúng tập ký tự được đặc tả.
