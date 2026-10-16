# TC-FORGOT-010: Bước 2 - Mật khẩu Thiếu Chữ số

## Requirement ID

FR-03 (Bước 2), FR-01

## Module / Test Type / Technique

PASSWORD-RESET-WEB / Functional / Domain Testing

## Preconditions

- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.

## Test Data

| Field | Value |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abcdefgh@!` |
| `confirm_password` | `Abcdefgh@!` |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `Abcdefgh@!` (có chữ hoa, chữ thường, ký tự đặc biệt nhưng KHÔNG có số).
3. Nhập ô xác nhận trùng khớp.
4. Gửi biểu mẫu.

## Expected Result

- Từ chối với thông báo lỗi yêu cầu mật khẩu phải có ít nhất 1 chữ số.

## Actual Result

Mật khẩu thiếu chữ số "ValidPass!" bị từ chối chính xác với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...".

**Execution report observation:** Từ chối chính xác với alert: "Mật khẩu quá yếu!...".

## Evidence

![TC-FORGOT-010](screenshots/TC-FORGOT-010.png)

## Status / Related Bugs

PASS / Không có — see [execution report](../../../reports/test-results/FR-03/domain_testing_report.md).
