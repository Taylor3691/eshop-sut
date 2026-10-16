# TC-MOB-BVA-FORGOT-016: Số lượng chữ số tại đúng biên tối thiểu (count = 1)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                             |
| ---------------- | --------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                       |
| `newPassword`    | `"Password1@"` (độ dài 10 ký tự, đúng 1 chữ số `1`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password1@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn điều kiện có ít nhất 1 chữ số.
- Đặt lại mật khẩu thành công, hiển thị Alert thành công.

## Actual Result

Có đúng 1 chữ số, reset thành công.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu của nhóm ký tự chữ số (`min_digit = 1`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
