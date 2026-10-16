# TC-MOB-BVA-FORGOT-018: Số lượng ký tự đặc biệt tại đúng biên tối thiểu (count = 1)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                     |
| ---------------- | ----------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                               |
| `newPassword`    | `"Password1@"` (độ dài 10 ký tự, đúng 1 ký tự đặc biệt `@`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password1@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn điều kiện có ít nhất 1 ký tự đặc biệt.
- Đặt lại mật khẩu thành công, hiển thị Alert thành công.

## Actual Result

Có đúng 1 ký tự đặc biệt, reset thành công.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu của nhóm ký tự đặc biệt (`min_spec = 1`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
