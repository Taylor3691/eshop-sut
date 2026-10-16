# TC-MOB-BVA-FORGOT-011: Số lượng chữ in hoa dưới biên tối thiểu (count = 0)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                              |
| ---------------- | ---------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                        |
| `newPassword`    | `"pass1234@"` (độ dài 9 ký tự, số lượng chữ hoa = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"pass1234@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*[A-Z])` phát hiện không có ký tự chữ in hoa nào (`count = 0`).
- Client validation chặn gửi form và hiển thị Alert thông báo mật khẩu quá yếu.

## Actual Result

Không có chữ hoa không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự chữ hoa (`min_upper - 1 = 0`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
