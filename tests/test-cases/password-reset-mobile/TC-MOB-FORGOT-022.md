# TC-MOB-FORGOT-022: Từ chối mật khẩu mới để trống ("")

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                     |
| ---------------- | --------------------------- |
| `newPassword`    | `""` (chuỗi rỗng, độ dài 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Để trống ô nhập "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client validation phát hiện chuỗi rỗng không thỏa mãn regex độ mạnh mật khẩu.
- Hiển thị hộp thoại Alert cảnh báo mật khẩu quá yếu.
- Không có request HTTP nào được gửi đến `/api/reset-password`.

## Actual Result

Mật khẩu rỗng không chuyển bước.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-007.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ cho trường mật khẩu mới để trống (Empty Password Partition).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
