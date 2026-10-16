# TC-MOB-FORGOT-024: Từ chối mật khẩu mới thiếu ký tự chữ in thường (a-z)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `newPassword`    | `"VALIDPASS1@"` (độ dài 11 ký tự, có hoa, số, đặc biệt nhưng thiếu chữ thường) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"VALIDPASS1@"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu chữ in thường `(?=.*[a-z])`.
- Hiển thị `Alert.alert("Lỗi", "Mật khẩu quá yếu!...")`.
- Thao tác đặt lại mật khẩu bị hủy bỏ.

## Actual Result

Thiếu chữ thường không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp ký tự chữ thường (Missing Lowercase Character Class Partition).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
