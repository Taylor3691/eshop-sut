# TC-MOB-FORGOT-028: Đặt lại mật khẩu với ký tự đặc biệt ngoài tập quy định tại FR-01 (ví dụ #, ^, \_)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số | Giá trị                                                                  |
| ---------------- | ------------------------------------------------------------------------ |
| `newPassword`    | `"ValidPass1#"` (chứa ký tự `#` không thuộc tập `{@, $, !, %, *, ?, &}`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"ValidPass1#"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát phản hồi của ứng dụng di động.

## Expected Result

- Theo regex triển khai trên Mobile (`(?=.*[^A-Za-z\d])`): Chấp nhận bất kỳ ký tự nào không phải chữ cái và số, bao gồm `#`.
- Theo đặc tả FR-01/FR-03: Ký tự đặc biệt quy định cụ thể gồm `@`, `$`, `!`, `%`, `*`, `?`, `&`.
- Kiểm thử và ghi nhận hành vi chấp nhận ký tự ngoài danh mục chuẩn của regex trên mobile app.

## Actual Result

Ký tự `#` được chấp nhận dù FR-01 loại trừ.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-028.png)

## Coverage Rationale

Kiểm thử miền giá trị ký tự đặc biệt ngoài danh mục cho phép (Out-of-Specification Special Character Boundary Partition).

## Status / Related Bugs

FAIL / D-FR03-MOB-006 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
