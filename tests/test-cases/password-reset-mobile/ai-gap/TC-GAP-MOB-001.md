# TC-GAP-MOB-001: Không hiển thị mã OTP trực tiếp trên màn hình trong môi trường demo trên Mobile

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Tài khoản `test@eshop.com` tồn tại trong cơ sở dữ liệu hệ thống.
- Hệ thống đang chạy trong môi trường demo/testing.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên Mobile App.

## Test Data

| Field | Value |
|---|---|
| `forgotEmail` | `"test@eshop.com"` |
| Endpoint API | `POST /api/forgot-password` |

## Test Steps

1. Nhập `"test@eshop.com"` vào ô "Nhập Email của bạn" tại Bước 1.
2. Nhấn nút "Lấy mã OTP".
3. Chờ ứng dụng chuyển sang Bước 2.
4. Quan sát toàn bộ nội dung và hộp thông báo hiển thị tại Bước 2 (`styles.messageBox`).

## Expected Result

- Theo đặc tả FR-03: *"trong môi trường demo: hiển thị trực tiếp trên màn hình"*.
- Ứng dụng phải lấy thuộc tính `data.resetToken` từ phản hồi của API và hiển thị mã OTP trực tiếp trên màn hình (tương tự như banner trên web).
- Người dùng có thể đọc được mã OTP để điền vào ô xác thực ở Bước 2.

## Actual Result

`setForgotMessage()` hiển thị chuỗi tĩnh; bỏ qua `data.resetToken`, không hiện OTP

## Missing Scenario

Kiểm tra khả năng hiển thị mã OTP trực tiếp trên giao diện ứng dụng di động trong môi trường demo/thực hành kiểm thử theo quy định đặc tả FR-03, giúp người kiểm thử hoặc người dùng demo nhận được mã mà không cần cấu hình hạ tầng gửi email thực tế.

## Gap Rationale

Bộ kiểm thử web ban đầu (`TC-FORGOT-001`) chỉ xác minh giao diện web (nơi mã OTP được render ở banner màu xanh). AI bỏ sót việc kiểm tra mã nguồn mobile trong `frontend-mobile/App.js:251-253`, nơi ứng dụng gán cứng chuỗi `setForgotMessage("Nếu email tồn tại trong hệ thống, mã OTP đã được gửi đến email của bạn.")` và bỏ qua hoàn toàn `data.resetToken`, khiến người dùng trên mobile không thể biết được mã OTP trong môi trường demo.

## Status / Related Bugs

FAIL / DEF-FR03-08 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
