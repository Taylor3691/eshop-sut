# TC-MOB-FORGOT-011: Chuyển đổi trạng thái từ Bước 1 sang Bước 2 và hiển thị các trường nhập liệu

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng nhập email hợp lệ `test@eshop.com` tại Bước 1 và nhấn "Lấy mã OTP".
- Server phản hồi thành công (HTTP 200).

## Test Data

| Trường / Thao tác | Giá trị            |
| ----------------- | ------------------ |
| Trạng thái trước  | `forgotStep === 1` |
| Hành động         | Nhấn "Lấy mã OTP"  |
| Trạng thái sau    | `forgotStep === 2` |

## Test Steps

1. Nhập `test@eshop.com` và nhấn "Lấy mã OTP".
2. Quan sát quá trình re-render của component trên màn hình thiết bị.
3. Kiểm tra các thành phần giao diện mới xuất hiện.

## Expected Result

- Giao diện chuyển sang Bước 2: Ẩn ô nhập email Bước 1.
- Hiển thị thông báo hướng dẫn (`styles.messageBox`).
- Hiển thị ô nhập mã OTP có nhãn "Mã OTP (4 số)".
- Hiển thị ô nhập mật khẩu mới với nhãn "Mật khẩu mới" (`secureTextEntry`).
- Hiển thị nút "Đặt lại mật khẩu" (`styles.greenButton`) và nút "← Quay lại".

## Actual Result

Bước 2 hiển thị OTP, mật khẩu mới, reset và quay lại.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Coverage Rationale

Kiểm thử chuyển đổi trạng thái biểu mẫu nhiều bước (Multi-step Form State Transition) trên nền tảng React Native.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
