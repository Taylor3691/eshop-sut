# TC-MOB-FORGOT-015: Đặt lại mật khẩu thành công với mã OTP hợp lệ và mật khẩu mới mạnh hợp lệ

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Đã yêu cầu OTP thành công cho `test@eshop.com` và lấy được mã OTP hợp lệ trong CSDL (ví dụ: `"5984"`).
- Người dùng đang ở màn hình Bước 2 trên ứng dụng mobile.

## Test Data

| Trường / Tham số | Giá trị                                                     |
| ---------------- | ----------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ sinh ra trong CSDL                            |
| `newPassword`    | `"Pass123@!"` (8 ký tự, có hoa, thường, số, ký tự đặc biệt) |
| Endpoint API     | `POST /api/reset-password`                                  |

## Test Steps

1. Nhập mã OTP hợp lệ vào ô "Mã OTP (4 số)".
2. Nhập `"Pass123@!"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát hộp thoại thông báo và luồng chuyển trang.

## Expected Result

- Mật khẩu mới vượt qua biểu thức chính quy kiểm tra độ mạnh phía client.
- Ứng dụng gửi request POST `/api/reset-password` thành công (HTTP 200).
- Hệ thống hiển thị hộp thoại: `Alert.alert("Thành công", "Đổi mật khẩu thành công!")`.
- Khi đóng alert, ứng dụng tự động chuyển về màn hình Đăng nhập (`view === "login"`).

## Actual Result

Token thật 4 số và mật khẩu mạnh đưa UI về Login.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-020.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ chính (Happy Path / Primary Valid Equivalence Partition) cho toàn bộ quy trình đặt lại mật khẩu ở Bước 2.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
