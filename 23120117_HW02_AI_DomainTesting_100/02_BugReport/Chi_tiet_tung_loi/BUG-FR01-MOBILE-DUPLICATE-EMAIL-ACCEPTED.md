---
name: Bug Report
title: "[BUG]: Mobile cho phép đăng ký bằng Email đã tồn tại"
labels: ["type: bug", "status: Open", "platform: mobile"]
---

## Mô tả lỗi
Hệ thống cho phép tạo thêm tài khoản với Email đã tồn tại, vi phạm yêu cầu Email phải duy nhất.

Test case phát hiện: `TC-REG-005`.

## Môi trường
- Nền tảng: React Native với Expo
- Thành phần: Đăng ký Mobile và API đăng ký
- API: `POST /api/register`
- Trạng thái: Cần bổ sung thông tin thiết bị, phiên bản hệ điều hành và thời điểm chạy khi tạo GitHub Issue

## Steps to reproduce
1. Bảo đảm Email kiểm thử đã có trong cơ sở dữ liệu.
2. Mở màn hình Đăng ký Mobile.
3. Nhập Họ Tên và Mật khẩu hợp lệ, dùng lại Email đã tồn tại.
4. Gửi form đăng ký.

## Actual result
Tài khoản vẫn được tạo và ứng dụng chuyển tới trang Đăng nhập.

## Expected result
Hệ thống từ chối đăng ký vì Email không duy nhất.

## Phân tích kỹ thuật
Bảng `users` hiện không khai báo ràng buộc `UNIQUE` cho cột `email`; endpoint đăng ký cũng không truy vấn kiểm tra trùng trước khi chèn.
