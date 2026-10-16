# TC-MOB-FORGOT-008: Yêu cầu mã OTP với email sai định dạng (Thiếu ký tự @ hoặc tên miền)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Test Data

| Trường / Tham số | Giá trị                             |
| ---------------- | ----------------------------------- |
| `forgotEmail`    | `"testeshop.com"` (thiếu ký tự `@`) |

## Test Steps

1. Nhập chuỗi `"testeshop.com"` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản ứng xác thực từ ứng dụng và backend.

## Expected Result

- Hệ thống từ chối xử lý email sai định dạng cú pháp (theo chuẩn `user@domain.com` định nghĩa tại FR-01 và FR-03).
- Ứng dụng hiển thị cảnh báo định dạng email không hợp lệ, không chuyển tiếp sang Bước 2.

## Actual Result

Email sai định dạng trả HTTP 404.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-008.png)

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ (Invalid Syntax Partition): Email không đúng định dạng chuẩn RFC / System Specification.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
