# TC-MOB-BVA-FORGOT-012: Số lượng chữ in hoa tại đúng biên tối thiểu (count = 1)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                            |
| ---------------- | -------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                      |
| `newPassword`    | `"Pass1234@"` (độ dài 9 ký tự, đúng 1 chữ hoa `P`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Pass1234@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn điều kiện có ít nhất 1 chữ hoa.
- Hệ thống chấp nhận và thực hiện đặt lại mật khẩu thành công.

## Actual Result

Có đúng 1 chữ hoa, reset thành công.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu của nhóm ký tự chữ hoa (`min_upper = 1`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
