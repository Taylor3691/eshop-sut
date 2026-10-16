# TC-MOB-BVA-FORGOT-017: Số lượng ký tự đặc biệt dưới biên tối thiểu (count = 0)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                       |
| ---------------- | ------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                 |
| `newPassword`    | `"Password12"` (độ dài 10 ký tự, số lượng ký tự đặc biệt = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password12"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*[^A-Za-z\d])` phát hiện không có ký tự đặc biệt nào (`count = 0`).
- Client validation chặn và hiển thị Alert thông báo mật khẩu quá yếu.

## Actual Result

Không có ký tự đặc biệt không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-017.png)

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự đặc biệt (`min_spec - 1 = 0`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
