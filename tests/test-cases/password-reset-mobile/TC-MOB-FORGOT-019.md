# TC-MOB-FORGOT-019: Cô lập tài khoản — Từ chối sử dụng mã OTP chéo giữa các tài khoản người dùng

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- User A (`test@eshop.com`) và User B (`admin@eshop.com`) cùng tồn tại trong CSDL.
- Tạo mã OTP hợp lệ cho User A (`test@eshop.com`).

## Test Data

| Trường / Tham số           | Giá trị                                         |
| -------------------------- | ----------------------------------------------- |
| `forgotEmail` gửi ở Bước 2 | `"admin@eshop.com"` (User B)                    |
| `resetToken`               | Mã OTP vừa sinh của `"test@eshop.com"` (User A) |
| `newPassword`              | `"NewPass123@!"`                                |

## Test Steps

1. Gửi request đặt lại mật khẩu với email của User B nhưng sử dụng mã OTP của User A.
2. Kiểm tra phản hồi từ API và thông báo trên ứng dụng.

## Expected Result

- Câu lệnh SQL kiểm tra đồng thời cả `email` và `reset_token`: `WHERE email = ? AND reset_token = ?`.
- Do mã OTP của User A không khớp với bản ghi của User B, câu lệnh không cập nhật dòng nào (`changes === 0`).
- Server trả về HTTP 400 và ứng dụng hiển thị alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".
- Tài khoản User B hoàn toàn được bảo vệ, không bị chiếm đoạt mật khẩu chéo.

## Actual Result

Không có email ở Bước 2 nên không nhập được kịch bản chéo tài khoản qua UI.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Coverage Rationale

Kiểm thử phân hoạch bảo mật cô lập dữ liệu chéo tài khoản (Cross-account Token Isolation / Authorization Boundary).

## Status / Related Bugs

BLOCKED / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
