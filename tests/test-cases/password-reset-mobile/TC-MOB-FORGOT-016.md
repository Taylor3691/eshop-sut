# TC-MOB-FORGOT-016: Từ chối đặt lại mật khẩu khi nhập sai giá trị mã OTP

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Đã tạo mã OTP hợp lệ cho `test@eshop.com`.
- Người dùng đang ở màn hình Bước 2.

## Test Data

| Trường / Tham số | Giá trị                                        |
| ---------------- | ---------------------------------------------- |
| `resetToken`     | `"0000"` (mã OTP không khớp với mã trong CSDL) |
| `newPassword`    | `"Pass123@!"`                                  |

## Test Steps

1. Nhập mã OTP sai `"0000"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@!"`.
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Server phản hồi mã lỗi HTTP 400 Bad Request `{"error": "Invalid token or email"}`.
- Ứng dụng hiển thị thông báo: `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu tài khoản không bị thay đổi trong cơ sở dữ liệu; người dùng vẫn ở lại Bước 2.

## Actual Result

OTP sai giữ ở Bước 2, backend trả HTTP 400.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ (Invalid OTP Value Partition) khi mã OTP nhập vào không trùng khớp.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
