# TC-MOB-FORGOT-020: Đặt lại mật khẩu với mật khẩu mới đạt đúng độ dài tối thiểu 8 ký tự kèm đủ các nhóm ký tự

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ của `test@eshop.com`.

## Test Data

| Trường / Tham số | Giá trị                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `newPassword`    | `"Pass123@"` (đúng 8 ký tự: 1 hoa `P`, 3 thường `ass`, 3 số `123`, 1 ký tự đặc biệt `@`) |

## Test Steps

1. Nhập mã OTP hợp lệ vào ô OTP.
2. Nhập `"Pass123@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Biểu thức chính quy `strongPasswordRegex` phía client thẩm định đạt yêu cầu tối thiểu 8 ký tự.
- Gửi yêu cầu đặt lại mật khẩu lên server thành công; hiển thị Alert thông báo đổi mật khẩu thành công.

## Actual Result

Mật khẩu mạnh 8 ký tự thành công với token thật.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Coverage Rationale

Kiểm thử phân tích giá trị biên tối thiểu (Lower Boundary Value: `min_length = 8`) của trường mật khẩu mới.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
