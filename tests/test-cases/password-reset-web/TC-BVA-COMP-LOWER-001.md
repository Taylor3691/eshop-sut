# TC-BVA-COMP-LOWER-001: Số lượng Chữ thường Dưới Biên (0 Chữ thường)

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
| `new_password` | `ABC1234@X` (8 ký tự, 0 chữ thường) |
| `confirm_password` | `ABC1234@X` |

## Test Steps

1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `ABC1234@X` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.

## Expected Result

- Hệ thống từ chối mật khẩu do thiếu ký tự viết thường (`min = 1`).

## Actual Result

Từ chối mật khẩu 0 chữ thường ("PASS123@!") với alert: "Mật khẩu quá yếu...".

**Execution report observation:** Từ chối chính xác với alert: "Mật khẩu quá yếu!...".

## Evidence

![TC-BVA-COMP-LOWER-001](screenshots/TC-BVA-COMP-LOWER-001.png)

## Test Design Rationale

Kiểm tra biên số lượng chữ thường dưới ngưỡng (`1 - 1 = 0`).

## Status / Related Bugs

PASS / Không có — see [execution report](../../../reports/test-results/FR-03/bva_testing_report.md).
