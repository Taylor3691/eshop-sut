# TC-MOB-FORGOT-009: Yêu cầu mã OTP với email chứa khoảng trắng ở đầu hoặc cuối (" test@eshop.com ")

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký hợp lệ trong CSDL.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Test Data

| Trường / Tham số | Giá trị                                          |
| ---------------- | ------------------------------------------------ |
| `forgotEmail`    | `" test@eshop.com "` (có dấu cách ở đầu và cuối) |

## Test Steps

1. Nhập `" test@eshop.com "` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát cách xử lý chuỗi ký tự của ứng dụng.

## Expected Result

- Ứng dụng hoặc server tự động cắt tỉa khoảng trắng (trim) để tìm thấy người dùng `test@eshop.com` và gửi OTP thành công; hoặc nếu không trim, hệ thống từ chối an toàn mà không làm crash ứng dụng.

## Actual Result

Email có khoảng trắng không được trim, trả HTTP 404.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-009.png)

## Coverage Rationale

Kiểm thử khả năng xử lý dữ liệu đầu vào chứa ký tự khoảng trắng dư thừa (Untrimmed Whitespace Robustness).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
