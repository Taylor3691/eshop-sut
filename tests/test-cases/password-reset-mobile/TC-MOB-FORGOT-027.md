# TC-MOB-FORGOT-027: Đặt lại mật khẩu với các ký tự đặc biệt hợp lệ trong tập quy định (@, $, !, %, \*, ?, &)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Test Data

| Trường / Tham số         | Giá trị                        |
| ------------------------ | ------------------------------ |
| `newPassword` biến thể 1 | `"Pass$1234"` (dùng ký tự `$`) |
| `newPassword` biến thể 2 | `"Pass!1234"` (dùng ký tự `!`) |
| `newPassword` biến thể 3 | `"Pass%1234"` (dùng ký tự `%`) |
| `newPassword` biến thể 4 | `"Pass*1234"` (dùng ký tự `*`) |
| `newPassword` biến thể 5 | `"Pass?1234"` (dùng ký tự `?`) |
| `newPassword` biến thể 6 | `"Pass&1234"` (dùng ký tự `&`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Lần lượt thử nghiệm với từng biến thể mật khẩu chứa ký tự đặc biệt thuộc tập hợp chuẩn quy định tại FR-01/FR-03.
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Tất cả các biến thể ký tự đặc biệt hợp lệ đều được biểu thức chính quy của mobile app chấp nhận.
- Đặt lại mật khẩu thành công và hiển thị Alert thông báo thành công.

## Actual Result

Ký tự đặc biệt `@` được chấp nhận.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Coverage Rationale

Kiểm thử độ bao phủ toàn diện của tập ký tự đặc biệt hợp lệ theo đặc tả (Special Character Equivalence Set Coverage).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
