# TC-MOB-BVA-FORGOT-010: Độ dài mật khẩu mới ngay trên biên tối thiểu (length = 9, min + 1)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                                |
| `newPassword`    | `"Passw123@"` (độ dài đúng 9 ký tự: 1 hoa, 4 thường, 3 số, 1 ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 9 ký tự `"Passw123@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn đầy đủ các điều kiện và được client chấp nhận.
- Đặt lại mật khẩu thành công, hiển thị Alert thành công.

## Actual Result

Mật khẩu mạnh 9 ký tự thành công.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Boundary Rationale

Kiểm tra giá trị ngay trên biên tối thiểu (`min_length + 1 = 9 ký tự`), thuộc miền giá trị hợp lệ danh định.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
