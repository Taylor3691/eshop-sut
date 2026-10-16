# TC-MOB-BVA-FORGOT-004: Độ dài mã OTP dưới ngưỡng đặc tả 6 chữ số (length = 5)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Test Data

| Trường / Tham số | Giá trị                     |
| ---------------- | --------------------------- |
| `resetToken`     | `"12345"` (độ dài 5 chữ số) |
| `newPassword`    | `"Pass123@"`                |

## Test Steps

1. Nhập `"12345"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Hệ thống từ chối mã OTP 5 chữ số (không hợp lệ so với cả chuẩn 4 số của backend lẫn chuẩn 6 số của đặc tả FR-03).
- Hiển thị hộp thoại cảnh báo lỗi `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.

## Actual Result

OTP 5 số bị từ chối.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Boundary Rationale

Kiểm tra giá trị ngay dưới biên độ dài OTP theo đặc tả yêu cầu FR-03 (`6 - 1 = 5 chữ số`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
