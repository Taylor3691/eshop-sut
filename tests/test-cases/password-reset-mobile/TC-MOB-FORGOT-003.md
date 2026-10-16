# TC-MOB-FORGOT-003: Kiểm tra sự hiện diện của nút "Quay lại đăng nhập" tại Bước 1 theo đặc tả FR-03

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu tại Bước 1 (`forgotStep === 1`).

## Test Data

| Trường / Thao tác   | Giá trị                             |
| ------------------- | ----------------------------------- |
| Màn hình            | Quên mật khẩu (Bước 1)              |
| Thành phần kiểm tra | Nút / Liên kết "Quay lại đăng nhập" |

## Test Steps

1. Mở màn hình Quên mật khẩu tại Bước 1.
2. Kiểm tra các nút điều hướng bên trong khung biểu mẫu (`styles.formContainer`).
3. Tìm kiếm nút hoặc liên kết có nhãn "Quay lại đăng nhập" (hoặc tương đương).

## Expected Result

- Theo đặc tả FR-03: Giao diện Bước 1 phải có nút "Quay lại đăng nhập" cho phép người dùng hủy thao tác và quay về màn hình Đăng nhập thuận tiện.
- Khi nhấn nút này, ứng dụng phải chuyển ngay về `view === "login"`.

## Actual Result

Không có nút Quay lại đăng nhập tại Bước 1.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-001.png)

## Coverage Rationale

Kiểm thử yêu cầu điều hướng quay lui (Exit / Cancellation Navigation) theo tiêu chuẩn quy định tại FR-03.

## Status / Related Bugs

FAIL / D-FR03-MOB-002 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
