# TC-MOB-BVA-FORGOT-013: Số lượng chữ in thường dưới biên tối thiểu (count = 0)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                 |
| ---------------- | ------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                           |
| `newPassword`    | `"PASS1234@"` (độ dài 9 ký tự, số lượng chữ thường = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"PASS1234@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*[a-z])` phát hiện không có ký tự chữ in thường nào (`count = 0`).
- Client validation chặn và hiển thị Alert mật khẩu quá yếu.

## Actual Result

Không có chữ thường không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự chữ thường (`min_lower - 1 = 0`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
