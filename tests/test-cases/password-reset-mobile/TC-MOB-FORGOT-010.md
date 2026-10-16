# TC-MOB-FORGOT-010: Yêu cầu mã OTP với email dạng chữ hoa toàn bộ ("TEST@ESHOP.COM")

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Tài khoản được đăng ký trong hệ thống dưới dạng `test@eshop.com`.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Test Data

| Trường / Tham số | Giá trị            |
| ---------------- | ------------------ |
| `forgotEmail`    | `"TEST@ESHOP.COM"` |

## Test Steps

1. Nhập `"TEST@ESHOP.COM"` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Kiểm tra phản hồi từ ứng dụng và API.

## Expected Result

- Theo chuẩn xử lý địa chỉ thư điện tử (Case-insensitive matching), hệ thống nhận diện đúng tài khoản `test@eshop.com`, phản hồi thành công và chuyển sang Bước 2.

## Actual Result

Email chữ hoa trả HTTP 404, không matching không phân biệt hoa thường.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-010.png)

## Coverage Rationale

Kiểm thử tính không phân biệt chữ hoa/chữ thường (Case-insensitivity) của trường định danh tài khoản email.

## Status / Related Bugs

FAIL / D-FR03-MOB-005 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
