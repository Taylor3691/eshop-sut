# TC-BVA-COMP-SPEC-002: Số lượng Ký tự Đặc biệt Tại Biên (1 Ký tự Đặc biệt Hợp lệ)

## Requirement ID

FR-03 (Bước 2), FR-01

## Module / Test Type / Technique

PASSWORD-RESET-WEB / Functional / BVA

## Preconditions

- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.

## Test Data

| Field | Value |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abcdef12@` (8 ký tự, chính xác 1 ký tự đặc biệt: '@') |
| `confirm_password` | `Abcdef12@` |

## Test Steps

1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abcdef12@` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.

## Expected Result

- Xác thực mật khẩu vượt qua yêu cầu ký tự đặc biệt. Đặt lại mật khẩu thành công.

## Actual Result

Mật khẩu có đúng 1 ký tự đặc biệt "Password123@" bị regex Client từ chối do ký tự "@" không được chấp nhận.

**Execution report observation:** Bị Client Regex chặn do chứa ký tự `@` và thiếu khoảng trắng.

## Evidence

![TC-BVA-COMP-SPEC-002](screenshots/TC-BVA-COMP-SPEC-002.png)

## Test Design Rationale

Kiểm tra số lượng ký tự đặc biệt chính xác tại ngưỡng tối thiểu (`min = 1`).

## Status / Related Bugs

FAIL / DEF-FR03-05 — see [execution report](../../../reports/test-results/FR-03/bva_testing_report.md).
