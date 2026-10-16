# TC-MOB-BVA-FORGOT-006: Độ dài mã OTP ngay trên ngưỡng đặc tả 6 chữ số (length = 7)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Test Data

| Trường / Tham số | Giá trị                       |
| ---------------- | ----------------------------- |
| `resetToken`     | `"1234567"` (độ dài 7 chữ số) |
| `newPassword`    | `"Pass123@"`                  |

## Test Steps

1. Nhập `"1234567"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Hệ thống từ chối cập nhật mật khẩu với mã OTP vượt quá độ dài chuẩn.
- Hiển thị thông báo `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.

## Actual Result

OTP 7 số bị từ chối.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay trên ngưỡng độ dài tối đa của mã OTP theo đặc tả (`6 + 1 = 7 chữ số`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
