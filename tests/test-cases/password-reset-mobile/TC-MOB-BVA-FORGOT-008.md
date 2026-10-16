# TC-MOB-BVA-FORGOT-008: Độ dài mật khẩu mới ngay dưới biên tối thiểu (length = 7, min - 1)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                              |
| `newPassword`    | `"Pas12@!"` (độ dài đúng 7 ký tự: 1 hoa, 2 thường, 2 số, 2 ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 7 ký tự `"Pas12@!"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra độ dài `.{8,}` không thỏa mãn do chuỗi chỉ có 7 ký tự.
- Client validation chặn gửi dữ liệu và hiển thị Alert cảnh báo mật khẩu quá yếu.

## Actual Result

Mật khẩu 7 ký tự không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Boundary Rationale

Kiểm tra giá trị ngay dưới biên tối thiểu (`min_length - 1 = 7 ký tự`), là ranh giới từ chối của quy tắc độ dài mật khẩu.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
