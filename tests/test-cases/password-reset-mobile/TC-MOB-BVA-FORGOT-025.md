# TC-MOB-BVA-FORGOT-025: Biên liên kết tài khoản OTP - Email không trùng khớp (email_match = False)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Mã OTP `"5984"` được sinh cho tài khoản User A (`test@eshop.com`).
- Tài khoản User B (`admin@eshop.com`) tồn tại trong CSDL nhưng không có mã OTP này.

## Test Data

| Trường / Tham số | Giá trị                      |
| ---------------- | ---------------------------- |
| `email` gửi lên  | `"admin@eshop.com"` (User B) |
| `resetToken`     | `"5984"` (mã OTP của User A) |
| `newPassword`    | `"Pass123@"`                 |

## Test Steps

1. Gửi request đặt lại mật khẩu với email của User B và mã OTP của User A.
2. Kiểm tra mã trạng thái HTTP và thông báo từ ứng dụng.

## Expected Result

- Server đối chiếu điều kiện kép không tìm thấy bản ghi khớp (`changes = 0`), trả về HTTP 400 `{"error": "Invalid token or email"}`.
- Ứng dụng hiển thị thông báo `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu của cả hai tài khoản không bị ảnh hưởng.

## Actual Result

Không có email ở Bước 2 nên kiểm thử chéo tài khoản qua UI bị chặn.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Boundary Rationale

Kiểm tra tại điểm biên liên kết định danh tài khoản bị sai lệch (`email_match = False`), bảo đảm tính toàn vẹn và cô lập an toàn giữa các tài khoản.

## Status / Related Bugs

BLOCKED / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
