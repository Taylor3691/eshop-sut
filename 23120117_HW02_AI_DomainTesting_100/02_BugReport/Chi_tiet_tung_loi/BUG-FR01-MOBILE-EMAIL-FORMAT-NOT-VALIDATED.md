---
name: Bug Report
title: "[BUG]: Mobile chấp nhận Email rỗng hoặc sai định dạng khi đăng ký"
labels: ["type: bug", "status: Open", "platform: mobile"]
---

## Mô tả lỗi
Luồng đăng ký Mobile không kiểm tra Email bắt buộc và định dạng `user@domain.com`. Nhiều chuỗi rỗng hoặc sai cấu trúc vẫn đi tới API đăng ký.

Test case phát hiện: `TC-REG-003`, `TC-REG-004`, `TC-REG-013`, `TC-REG-014`, `TC-REG-015`, `TC-REG-016`, `TC-REG-017`.

## Môi trường
- Nền tảng: React Native với Expo
- Thành phần: Màn hình Đăng ký Mobile
- API: `POST /api/register`
- Trạng thái: Cần bổ sung thông tin thiết bị, phiên bản hệ điều hành và thời điểm chạy khi tạo GitHub Issue

## Steps to reproduce
1. Mở màn hình Đăng ký Mobile.
2. Nhập Họ Tên và Mật khẩu hợp lệ.
3. Nhập một Email rỗng hoặc sai định dạng, ví dụ `user.example.com`.
4. Gửi form đăng ký.

## Actual result
Ứng dụng không chặn dữ liệu Email không hợp lệ trước khi gửi và tài khoản có thể được tạo.

## Expected result
Hệ thống từ chối đăng ký khi Email rỗng hoặc không đúng dạng `user@domain.com`.

## Phân tích kỹ thuật
Ứng dụng Mobile không có kiểm tra định dạng Email trong `handleRegister`; backend cũng không kiểm tra trường này trước khi chèn dữ liệu.
