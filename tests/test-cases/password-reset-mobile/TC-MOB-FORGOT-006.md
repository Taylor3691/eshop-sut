# TC-MOB-FORGOT-006: Yêu cầu mã OTP với địa chỉ email chưa từng đăng ký trong hệ thống

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Địa chỉ email `unregistered_mobile@eshop.com` chưa từng được đăng ký và không tồn tại trong CSDL.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Test Data

| Trường / Tham số | Giá trị                           |
| ---------------- | --------------------------------- |
| `forgotEmail`    | `"unregistered_mobile@eshop.com"` |
| Endpoint API     | `POST /api/forgot-password`       |

## Test Steps

1. Nhập `"unregistered_mobile@eshop.com"` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát hộp thoại cảnh báo và trạng thái màn hình.

## Expected Result

- Server phản hồi mã trạng thái HTTP 404 với body `{"error": "User not found"}`.
- Ứng dụng kích hoạt hộp thoại `Alert.alert("Lỗi", "User not found")`.
- Ứng dụng không tạo mã OTP, không chuyển sang Bước 2 (`forgotStep` vẫn là 1).

## Actual Result

HTTP 404, vẫn ở Bước 1; native alert không quan sát được trên web.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-006.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ (Invalid Equivalence Partition): Tài khoản email không tồn tại trong hệ thống.

## Status / Related Bugs

BLOCKED / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
