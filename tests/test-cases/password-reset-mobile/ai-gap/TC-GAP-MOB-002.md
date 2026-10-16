# TC-GAP-MOB-002: Thiếu trường "Xác nhận mật khẩu mới" (Confirm New Password) trên giao diện Mobile

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`) trên Mobile App.

## Test Data

| Field | Value |
|---|---|
| Màn hình | Quên mật khẩu (Bước 2) |
| Thành phần kiểm tra | Trường nhập "Xác nhận mật khẩu mới" (`confirmPassword`) |

## Test Steps

1. Điều hướng đến màn hình Bước 2 trên Mobile App.
2. Kiểm tra cấu trúc các thẻ `TextInput` và nhãn `Text` trong hàm `renderForgotPassword()`.
3. Tìm kiếm trường nhập "Xác nhận mật khẩu mới" và logic kiểm tra so khớp hai mật khẩu.

## Expected Result

- Theo đặc tả FR-03 và FR-01: *"Người dùng nhập OTP, Mật khẩu mới, và Xác nhận mật khẩu mới. Hai trường mật khẩu phải khớp nhau."*
- Giao diện Bước 2 trên Mobile phải cung cấp trường nhập "Xác nhận mật khẩu mới" và từ chối nếu hai mật khẩu không khớp.

## Actual Result

Biểu mẫu Bước 2 chỉ có `resetToken` và `newPassword`; thiếu hoàn toàn ô xác nhận

## Missing Scenario

Kiểm tra sự hiện diện của trường nhập xác nhận mật khẩu mới và cơ chế so khớp độ lệch mật khẩu (levenshtein distance check) trên giao diện Mobile App.

## Gap Rationale

Trong thiết kế kiểm thử hộp đen ban đầu, AI suy diễn ca kiểm thử dựa trên giả định rằng giao diện đã có sẵn trường xác nhận mật khẩu. Trên thực tế, component `renderForgotPassword()` trong `frontend-mobile/App.js:860-889` chỉ render trường `newPassword` và bỏ quên hoàn toàn trường `confirmPassword`.

## Status / Related Bugs

FAIL / DEF-FR03-07 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
