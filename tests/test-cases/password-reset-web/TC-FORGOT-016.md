# TC-FORGOT-016: Bước 2 - Biên Độ dài OTP: 7 Chữ số

## Requirement ID

FR-03 (Bước 1, 2)

## Module / Test Type / Technique

PASSWORD-RESET-WEB / Functional / Domain Testing

## Preconditions

- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.

## Test Data

| Field | Value |
|---|---|
| `otp` | `1234567` (7 chữ số) |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |

## Test Steps

1. Tại Bước 2, nhập mã OTP 7 chữ số `1234567`.
2. Nhập mật khẩu mới hợp lệ và xác nhận.
3. Gửi biểu mẫu.

## Expected Result

- Hệ thống từ chối do độ dài OTP vượt quá quy định.

## Actual Result

Hệ thống từ chối mã OTP 7 chữ số ("1234567") với alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".

**Execution report observation:** Alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".

## Evidence

![TC-FORGOT-016](screenshots/TC-FORGOT-016.png)

## Status / Related Bugs

PASS / Không có — see [execution report](../../../reports/test-results/FR-03/domain_testing_report.md).
