---
name: Bug Report
title: "[BUG]: Mobile không kiểm tra Họ Tên bắt buộc khi đăng ký"
labels: ["type: bug", "status: Open", "platform: mobile"]
---

## Mô tả lỗi
Ứng dụng Mobile cho phép gửi đăng ký khi Họ Tên rỗng hoặc chỉ chứa khoảng trắng. Kết quả này vi phạm yêu cầu FR-01 rằng người dùng phải cung cấp Họ Tên.

Test case phát hiện: `TC-REG-002`, `TC-REG-012`, `TC-BVA-FR01-016`.

## Môi trường
- Nền tảng: React Native với Expo
- Thành phần: Màn hình Đăng ký Mobile
- API: `POST /api/register`
- Trạng thái: Cần bổ sung thông tin thiết bị, phiên bản hệ điều hành và thời điểm chạy khi tạo GitHub Issue

## Steps to reproduce
1. Mở màn hình Đăng ký trên ứng dụng Mobile.
2. Để trống Họ Tên hoặc chỉ nhập khoảng trắng.
3. Nhập Email chưa tồn tại và Mật khẩu hợp lệ.
4. Gửi form đăng ký.

## Actual result
Tài khoản vẫn được tạo và ứng dụng chuyển tới trang Đăng nhập.

## Expected result
Hệ thống từ chối đăng ký vì Họ Tên là trường bắt buộc.

## Phân tích kỹ thuật
Hàm `handleRegister` chỉ kiểm tra độ mạnh của Mật khẩu trước khi gửi request. Backend nhận và chèn trực tiếp `name`, `email`, `password` mà không kiểm tra Họ Tên rỗng.
