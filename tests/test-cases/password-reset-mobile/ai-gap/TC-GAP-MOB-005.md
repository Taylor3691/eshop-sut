# TC-GAP-MOB-005: Backend API bỏ qua kiểm tra độ mạnh mật khẩu khi đặt lại mật khẩu trực tiếp qua API

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Tài khoản `test@eshop.com` đã tạo mã OTP hợp lệ trong cơ sở dữ liệu.
- Kẻ tấn công hoặc client gửi trực tiếp HTTP POST đến endpoint API.

## Test Data

| Field | Value |
|---|---|
| Endpoint API | `POST /api/reset-password` |
| `email` | `"test@eshop.com"` |
| `resetToken` | Mã OTP hợp lệ |
| `newPassword` | `"123"` (mật khẩu quá ngắn, không thỏa mãn FR-01) |

## Test Steps

1. Yêu cầu mã OTP hợp lệ cho `test@eshop.com`.
2. Gửi request `POST /api/reset-password` trực tiếp với payload `{"email": "test@eshop.com", "resetToken": "<OTP>", "newPassword": "123"}`.
3. Kiểm tra mã phản hồi HTTP từ server.
4. Thử đăng nhập lại tài khoản `test@eshop.com` với mật khẩu `"123"`.

## Expected Result

- Theo yêu cầu bảo mật SEC-02 và FR-03: Backend API bắt buộc phải thẩm định độ mạnh của mật khẩu mới trước khi cập nhật vào CSDL.
- Backend phải từ chối mật khẩu yếu và trả về mã lỗi HTTP 400 Bad Request.

## Actual Result

Backend trả về HTTP 200; đổi thành công MK thành `"123"`; đăng nhập bằng `"123"` OK

## Missing Scenario

Kiểm tra tính phòng thủ của tầng Backend API khi nhận yêu cầu đặt lại mật khẩu với mật khẩu yếu (ví dụ `"123"` hoặc `"weak"`), bỏ qua lớp kiểm tra phía client.

## Gap Rationale

Bộ test client-side chỉ thực thi qua form mobile (nơi có regex chặn). AI mắc lỗi "Giả định đồng bộ đa tầng" (Tier Symmetry Assumption), mặc định tin rằng backend cũng kiểm tra độ mạnh mật khẩu giống client. Thực tế trong `backend/server.js:87-98`, backend không hề có bất kỳ câu lệnh validate nào và lưu thẳng chuỗi mật khẩu yếu vào CSDL.

## Status / Related Bugs

FAIL / DEF-FR03-06 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
