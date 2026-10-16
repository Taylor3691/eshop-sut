# TC-MOB-FORGOT-017: Từ chối đặt lại mật khẩu khi để trống mã OTP ("")

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Bước 2 sau khi gửi yêu cầu cho `test@eshop.com`.

## Test Data

| Trường / Tham số | Giá trị                    |
| ---------------- | -------------------------- |
| `resetToken`     | `""` (để trống ô nhập OTP) |
| `newPassword`    | `"Pass123@!"`              |

## Test Steps

1. Không nhập gì vào ô mã OTP (để chuỗi rỗng `""`).
2. Nhập mật khẩu mới hợp lệ `"Pass123@!"`.
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Hệ thống từ chối cập nhật mật khẩu, hiển thị `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu cũ được giữ nguyên; không phát sinh ngoại lệ không bắt được (uncaught exception).

## Actual Result

OTP rỗng giữ ở Bước 2.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Coverage Rationale

Kiểm thử giá trị rỗng / biên dưới của mã OTP (Empty OTP Boundary Partition).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
