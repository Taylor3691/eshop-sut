# TC-MOB-BVA-FORGOT-005: Độ dài mã OTP tại đúng ngưỡng đặc tả 6 chữ số (length = 6)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Test Data

| Trường / Tham số | Giá trị                                             |
| ---------------- | --------------------------------------------------- |
| `resetToken`     | `"123456"` (độ dài đúng 6 chữ số theo đặc tả FR-03) |
| `newPassword`    | `"Pass123@"`                                        |

## Test Steps

1. Nhập mã OTP 6 chữ số `"123456"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".
4. Quan sát phản hồi giữa backend và ứng dụng.

## Expected Result

- Theo đặc tả FR-03: Mã OTP hợp lệ là mã 6 chữ số ngẫu nhiên.
- Hệ thống kiểm tra so khớp mã OTP trong CSDL (nếu backend sinh mã 4 chữ số, mã 6 số sẽ không khớp và trả về lỗi).

## Actual Result

OTP 6 số bị từ chối vì implementation dùng 4 số.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Boundary Rationale

Kiểm tra tại đúng giá trị biên độ dài của mã OTP theo đặc tả nghiệp vụ FR-03 (`length = 6 chữ số`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
