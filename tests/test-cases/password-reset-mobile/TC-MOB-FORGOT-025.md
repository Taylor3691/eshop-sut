# TC-MOB-FORGOT-025: Từ chối mật khẩu mới thiếu ký tự chữ số (0-9)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `newPassword`    | `"ValidPass@@"` (độ dài 11 ký tự, có hoa, thường, đặc biệt nhưng thiếu số) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"ValidPass@@"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu chữ số `(?=.*\d)`.
- Hiển thị hộp thoại thông báo mật khẩu quá yếu.

## Actual Result

Thiếu chữ số không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp chữ số (Missing Numeric Digit Class Partition).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
