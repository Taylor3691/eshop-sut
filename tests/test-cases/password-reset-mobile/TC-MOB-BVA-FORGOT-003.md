# TC-MOB-BVA-FORGOT-003: Độ dài mã OTP tại đúng ngưỡng triển khai mobile (length = 4)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Đã yêu cầu OTP thành công cho `test@eshop.com`.
- Mã OTP 4 chữ số trong CSDL là `"5984"`.
- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Test Data

| Trường / Tham số | Giá trị                                                  |
| ---------------- | -------------------------------------------------------- |
| `resetToken`     | `"5984"` (độ dài đúng 4 chữ số, khớp giá trị trong CSDL) |
| `newPassword`    | `"Pass123@"`                                             |

## Test Steps

1. Nhập `"5984"` vào ô "Mã OTP (4 số)".
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát kết quả xử lý.

## Expected Result

- Hệ thống chấp nhận mã OTP 4 chữ số khớp với CSDL.
- Phản hồi HTTP 200 OK từ `/api/reset-password`.
- Ứng dụng hiển thị thông báo `Alert.alert("Thành công", "Đổi mật khẩu thành công!")` và chuyển về màn hình `login`.

## Actual Result

OTP thật 4 số thành công, trả về Login.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-003.png)

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên độ dài của mã OTP theo cài đặt thực tế của backend và nhãn UI mobile (`length = 4 chữ số`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
