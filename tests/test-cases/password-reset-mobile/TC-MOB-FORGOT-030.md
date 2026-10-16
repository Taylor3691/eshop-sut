# TC-MOB-FORGOT-030: Xác minh đăng nhập thành công bằng mật khẩu mới sau khi hoàn tất quy trình Quên mật khẩu

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Tài khoản `test@eshop.com` đã hoàn tất quy trình đặt lại mật khẩu với mật khẩu mới `"BrandNewPass123!"`.
- Ứng dụng đã tự động điều hướng về màn hình Đăng nhập (`view === "login"`).

## Test Data

| Trường / Tham số | Giá trị              |
| ---------------- | -------------------- |
| `email`          | `"test@eshop.com"`   |
| `password` (mới) | `"BrandNewPass123!"` |
| `password` (cũ)  | `"Test1234!"`        |

## Test Steps

1. Thử đăng nhập bằng mật khẩu cũ `"Test1234!"` và nhấn "Sign In".
2. Xác nhận hệ thống từ chối đăng nhập với mật khẩu cũ.
3. Nhập mật khẩu mới `"BrandNewPass123!"` và nhấn "Sign In".
4. Quan sát trạng thái đăng nhập của ứng dụng di động.

## Expected Result

- Đăng nhập với mật khẩu cũ thất bại (báo lỗi đăng nhập).
- Đăng nhập với mật khẩu mới thành công: Server trả về JWT Token và thông tin người dùng.
- Header ứng dụng hiển thị `Chào, <user.name>`.
- Toàn bộ chu trình Quên mật khẩu & Đặt lại mật khẩu đạt tính toàn vẹn nghiệp vụ đầu cuối (End-to-End Integrity).

## Actual Result

Đăng nhập bằng mật khẩu mới thành công, hiển thị Test User.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-030.png)

## Coverage Rationale

Kiểm thử tích hợp luồng nghiệp vụ hoàn chỉnh từ đầu đến cuối (End-to-End Business Flow Integration Verification) xác minh mật khẩu mới có hiệu lực thực tế và mật khẩu cũ bị vô hiệu hóa.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
