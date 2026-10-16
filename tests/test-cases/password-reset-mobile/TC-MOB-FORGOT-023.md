# TC-MOB-FORGOT-023: Từ chối mật khẩu mới thiếu ký tự chữ in hoa (A-Z)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `newPassword`    | `"validpass1@"` (độ dài 11 ký tự, có thường, số, đặc biệt nhưng thiếu chữ hoa) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"validpass1@"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu chữ in hoa `(?=.*[A-Z])`.
- Hệ thống hiển thị hộp thoại `Alert.alert("Lỗi", "Mật khẩu quá yếu!...")`.
- Ngăn chặn gửi dữ liệu lên máy chủ.

## Actual Result

Thiếu chữ hoa không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp ký tự chữ hoa (Missing Uppercase Character Class Partition).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
