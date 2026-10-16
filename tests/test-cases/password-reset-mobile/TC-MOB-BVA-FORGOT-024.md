# TC-MOB-BVA-FORGOT-024: Biên liên kết tài khoản OTP - Email trùng khớp (email_match = True)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Tài khoản `test@eshop.com` đã yêu cầu mã OTP thành công.
- Mã OTP hợp lệ trong CSDL là `"5984"`.
- Người dùng đang ở Bước 2 với context email là `test@eshop.com`.

## Test Data

| Trường / Tham số | Giá trị                                      |
| ---------------- | -------------------------------------------- |
| `email` gửi lên  | `"test@eshop.com"`                           |
| `resetToken`     | `"5984"` (khớp đúng mã của `test@eshop.com`) |
| `newPassword`    | `"Pass123@"`                                 |

## Test Steps

1. Nhập mã OTP `"5984"`.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- API kiểm tra `WHERE email = 'test@eshop.com' AND reset_token = '5984'` tìm thấy đúng 1 bản ghi (`changes = 1`).
- Mật khẩu được cập nhật thành công, hiển thị Alert thành công và chuyển về màn hình `login`.

## Actual Result

Email khớp và token thật reset thành công.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Boundary Rationale

Kiểm tra tại điểm biên liên kết định danh tài khoản trùng khớp tuyệt đối (`email_match = True`), là điều kiện thành công duy nhất của quan hệ OTP-Email.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
