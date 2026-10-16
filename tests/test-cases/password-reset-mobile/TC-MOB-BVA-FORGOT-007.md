# TC-MOB-BVA-FORGOT-007: Độ dài mật khẩu mới bằng 0 (length = 0, chuỗi rỗng)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị              |
| ---------------- | -------------------- |
| `resetToken`     | Mã OTP hợp lệ        |
| `newPassword`    | `""` (độ dài bằng 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Để trống ô nhập "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Biểu thức chính quy `strongPasswordRegex` kiểm tra phía client chặn ngay lập tức.
- Hiển thị hộp thoại: `Alert.alert("Lỗi", "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.")`.
- Không gửi yêu cầu lên server.

## Actual Result

Mật khẩu rỗng không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Boundary Rationale

Kiểm tra tại điểm biên cực tiểu (chuỗi rỗng `length = 0`), thuộc miền không hợp lệ của trường mật khẩu mới.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
