# TC-MOB-FORGOT-021: Từ chối mật khẩu mới có độ dài dưới 8 ký tự (7 ký tự)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `newPassword`    | `"Pas12@!"` (độ dài đúng 7 ký tự: chứa đủ hoa, thường, số, ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 7 ký tự `"Pas12@!"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Client-side validation chặn ngay lập tức mà không gửi request lên backend.
- Hiển thị thông báo: `Alert.alert("Lỗi", "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.")`.
- Mật khẩu giữ nguyên, form không bị reset.

## Actual Result

Mật khẩu 7 ký tự không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Coverage Rationale

Kiểm thử giá trị ngay dưới biên tối thiểu (`min_length - 1 = 7 ký tự`) của quy tắc độ mạnh mật khẩu.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
