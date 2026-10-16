# TC-FORGOT-004: Bước 1 - Kiểm tra Điều hướng "Quay lại đăng nhập"

## Requirement ID

FR-03 (Bước 1)

## Module / Test Type / Technique

PASSWORD-RESET-WEB / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 1 của trang Quên mật khẩu.

## Test Data

| Field | Value |
|---|---|
| Thao tác | Nhấn nút "Quay lại đăng nhập" |

## Test Steps

1. Điều hướng đến `/forgot-password`.
2. Nhấn nút hoặc liên kết "Quay lại đăng nhập".

## Expected Result

- Ứng dụng điều hướng người dùng về trang Đăng nhập (`/login`).

## Actual Result

Giao diện biểu mẫu Bước 1 chỉ có trường nhập email và nút "Lấy mã OTP". Hoàn toàn không có nút hoặc liên kết "Quay lại đăng nhập" trong biểu mẫu.

**Execution report observation:** Bước 1 không có nút hoặc liên kết "Quay lại đăng nhập" trong form.

## Evidence

![TC-FORGOT-004](screenshots/TC-FORGOT-004.png)

## Status / Related Bugs

FAIL / DEF-FR03-03 — see [execution report](../../../reports/test-results/FR-03/domain_testing_report.md).
