# TC-MOB-BVA-FORGOT-009: Độ dài mật khẩu mới tại đúng biên tối thiểu (length = 8, min)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                     |
| ---------------- | --------------------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                               |
| `newPassword`    | `"Pass123@"` (độ dài đúng 8 ký tự: 1 hoa, 3 thường, 3 số, 1 ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 8 ký tự `"Pass123@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Biểu thức chính quy phía client chấp nhận mật khẩu đạt đúng 8 ký tự và chứa đủ 4 nhóm ký tự.
- Gửi yêu cầu đặt lại mật khẩu lên server thành công.
- Hiển thị Alert "Thành công: Đổi mật khẩu thành công!" và chuyển về màn hình `login`.

## Actual Result

Mật khẩu mạnh đúng 8 ký tự thành công.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Boundary Rationale

Kiểm tra giá trị tại đúng ngưỡng biên tối thiểu hợp lệ (`min_length = 8 ký tự`) theo quy định của FR-01 và FR-03.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
