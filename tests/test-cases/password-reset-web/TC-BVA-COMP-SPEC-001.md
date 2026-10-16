# TC-BVA-COMP-SPEC-001: Số lượng Ký tự Đặc biệt Dưới Biên (0 Ký tự Đặc biệt)

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
| `new_password` | `Abcdefg12` (8 ký tự, 0 ký tự đặc biệt) |
| `confirm_password` | `Abcdefg12` |

## Test Steps

1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abcdefg12` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.

## Expected Result

- Hệ thống từ chối mật khẩu do thiếu ký tự đặc biệt thuộc tập `@, $, !, %, *, ?, &`.

## Actual Result

Từ chối mật khẩu 0 ký tự đặc biệt ("Password123") với alert: "Mật khẩu quá yếu...".

**Execution report observation:** Từ chối chính xác với alert: "Mật khẩu quá yếu!...".

## Evidence

![TC-BVA-COMP-SPEC-001](screenshots/TC-BVA-COMP-SPEC-001.png)

## Test Design Rationale

Kiểm tra biên số lượng ký tự đặc biệt dưới ngưỡng (`1 - 1 = 0`).

## Status / Related Bugs

PASS / Không có — see [execution report](../../../reports/test-results/FR-03/bva_testing_report.md).
