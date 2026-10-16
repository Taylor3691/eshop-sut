# TC-MOB-BVA-FORGOT-015: Số lượng chữ số dưới biên tối thiểu (count = 0)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                               |
| ---------------- | ----------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                         |
| `newPassword`    | `"Password@!"` (độ dài 10 ký tự, số lượng chữ số = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password@!"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*\d)` phát hiện không có chữ số nào (`count = 0`).
- Client validation chặn và hiển thị Alert thông báo mật khẩu quá yếu.

## Actual Result

Không có chữ số không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự chữ số (`min_digit - 1 = 0`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
