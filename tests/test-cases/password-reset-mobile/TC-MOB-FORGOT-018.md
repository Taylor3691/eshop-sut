# TC-MOB-FORGOT-018: Từ chối đặt lại mật khẩu khi mã OTP chứa chữ cái hoặc ký tự đặc biệt

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên ứng dụng mobile.

## Test Data

| Trường / Tham số | Giá trị                |
| ---------------- | ---------------------- |
| `resetToken`     | `"12AB"` hoặc `"12!@"` |
| `newPassword`    | `"Pass123@!"`          |

## Test Steps

1. Cố tình nhập chuỗi chứa chữ cái hoặc ký tự đặc biệt vào ô OTP (thông qua bàn phím hoặc paste clipboard).
2. Nhập mật khẩu mới hợp lệ `"Pass123@!"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Bàn phím số (`keyboardType="numeric"`) hạn chế người dùng nhập chữ cái; nếu nhập được bằng paste, hệ thống từ chối cập nhật và hiển thị alert báo lỗi OTP không hợp lệ.

## Actual Result

OTP không phải số giữ ở Bước 2.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Coverage Rationale

Kiểm thử miền dữ liệu không đúng định dạng số của mã OTP (Non-numeric OTP Format Partition).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
