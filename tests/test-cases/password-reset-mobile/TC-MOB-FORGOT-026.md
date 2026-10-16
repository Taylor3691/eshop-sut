# TC-MOB-FORGOT-026: Từ chối mật khẩu mới thiếu ký tự đặc biệt

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                               |
| ---------------- | --------------------------------------------------------------------- |
| `newPassword`    | `"ValidPass123"` (độ dài 12 ký tự, chỉ gồm chữ hoa, chữ thường và số) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"ValidPass123"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu ký tự đặc biệt `(?=.*[^A-Za-z\d])`.
- Hiển thị hộp thoại cảnh báo: `Alert.alert("Lỗi", "Mật khẩu quá yếu!...")`.

## Actual Result

Thiếu ký tự đặc biệt không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-017.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp ký tự đặc biệt (Missing Special Character Class Partition).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
