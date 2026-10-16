# TC-MOB-FORGOT-004: Yêu cầu mã OTP thành công với email đã đăng ký hợp lệ (Phân hoạch hợp lệ cơ bản)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký hợp lệ và tồn tại trong cơ sở dữ liệu.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên ứng dụng di động.

## Test Data

| Trường / Tham số | Giá trị                       |
| ---------------- | ----------------------------- |
| `forgotEmail`    | `"test@eshop.com"`            |
| Endpoint API     | `POST /api/forgot-password`   |
| Payload gửi đi   | `{"email": "test@eshop.com"}` |

## Test Steps

1. Nhập `"test@eshop.com"` vào ô nhập "Nhập Email của bạn".
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản hồi từ hệ thống và sự chuyển đổi giao diện.

## Expected Result

- Ứng dụng gửi request POST đến `/api/forgot-password` kèm email hợp lệ.
- Server xử lý thành công và phản hồi mã HTTP 200 OK cùng mã đặt lại mật khẩu trong CSDL.
- Ứng dụng cập nhật thông báo `forgotMessage`: "Nếu email tồn tại trong hệ thống, mã OTP đã được gửi đến email của bạn.".
- Giao diện tự động chuyển sang Bước 2 (`forgotStep = 2`), hiển thị form nhập mã OTP và mật khẩu mới.

## Actual Result

Email hợp lệ trả HTTP 200 và chuyển Bước 2.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương hợp lệ cơ bản (Standard Valid Equivalence Partition) cho chức năng gửi yêu cầu OTP với tài khoản người dùng đã kích hoạt.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
