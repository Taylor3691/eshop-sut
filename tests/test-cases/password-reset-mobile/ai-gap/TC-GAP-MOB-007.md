# TC-GAP-MOB-007: Kiểm tra tính dùng một lần của mã OTP (Ngăn chặn Tấn công phát lại / Replay Attack)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Tài khoản `test@eshop.com` đã sử dụng mã OTP hợp lệ để đặt lại mật khẩu thành công lần 1.

## Test Data

| Field | Value |
|---|---|
| Endpoint API | `POST /api/reset-password` |
| `email` | `"test@eshop.com"` |
| `resetToken` | Mã OTP đã dùng thành công ở lần 1 |
| `newPassword` | `"AnotherPass123!"` |

## Test Steps

1. Hoàn tất việc đổi mật khẩu lần 1 bằng mã OTP hợp lệ.
2. Lập tức gửi tiếp một request `POST /api/reset-password` lần 2 với cùng mã OTP đó và mật khẩu mới khác.
3. Kiểm tra mã phản hồi HTTP và dữ liệu trả về từ server.

## Expected Result

- Theo nguyên tắc an toàn bảo mật SEC-07: Mã OTP phải bị hủy ngay sau khi sử dụng (Single-use token).
- Lần gọi thứ 2 phải bị từ chối với mã lỗi HTTP 400 Bad Request `{"error": "Invalid token or email"}`.

## Actual Result

Backend trả về HTTP 400 `{ error: "Invalid token or email" }` do `reset_token = NULL`

## Missing Scenario

Kiểm tra việc vô hiệu hóa mã OTP ngay sau khi đã sử dụng để đặt lại mật khẩu thành công, ngăn chặn kẻ tấn công sử dụng lại cùng một mã OTP.

## Gap Rationale

AI thiết kế test case thường chỉ kiểm tra luồng thông thường thành công 1 lần mà bỏ sót kiểm thử lỗ hổng bảo mật tấn công phát lại (Replay Attack) và tính dùng một lần của token xác thực.

## Status / Related Bugs

PASS / None — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
