# TC-MOB-FORGOT-013: Kiểm tra sự hiện diện của trường "Xác nhận mật khẩu mới" tại Bước 2 theo đặc tả FR-03 & FR-01

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`).

## Test Data

| Trường / Thao tác   | Giá trị                                               |
| ------------------- | ----------------------------------------------------- |
| Màn hình            | Quên mật khẩu (Bước 2)                                |
| Thành phần kiểm tra | Ô nhập "Xác nhận mật khẩu mới" (Confirm New Password) |

## Test Steps

1. Mở màn hình Quên mật khẩu Bước 2.
2. Kiểm tra danh sách các ô nhập liệu (`TextInput`) trên màn hình.
3. Tìm kiếm trường nhập có nhãn "Xác nhận mật khẩu mới" và logic so khớp mật khẩu.

## Expected Result

- Theo đặc tả FR-03: "Người dùng nhập OTP, Mật khẩu mới, và Xác nhận mật khẩu mới. Hai trường mật khẩu phải khớp nhau."
- Giao diện phải cung cấp ô nhập "Xác nhận mật khẩu mới" và từ chối nếu hai mật khẩu không trùng khớp.

## Actual Result

Thiếu trường Xác nhận mật khẩu mới.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Coverage Rationale

Kiểm thử sự đầy đủ của miền đầu vào biểu mẫu (Form Input Completeness & Password Confirmation) đối chiếu với đặc tả nghiệp vụ FR-03 và FR-01.

## Status / Related Bugs

FAIL / D-FR03-MOB-004 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
