# TC-MOB-FORGOT-001: Điều hướng từ màn hình Đăng nhập sang màn hình Quên mật khẩu

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Ứng dụng EShop Mobile đang mở và người dùng đang ở màn hình Đăng nhập (`view === "login"`).
- Người dùng chưa đăng nhập tài khoản.

## Test Data

| Trường / Thao tác  | Giá trị                                                  |
| ------------------ | -------------------------------------------------------- |
| Màn hình hiện tại  | `login`                                                  |
| Thao tác tương tác | Nhấn vào liên kết "Quên mật khẩu?" (`styles.forgotLink`) |

## Test Steps

1. Mở ứng dụng EShop Mobile và điều hướng đến màn hình Đăng nhập.
2. Quan sát liên kết "Quên mật khẩu?" bên dưới trường nhập Mật khẩu.
3. Nhấn vào liên kết "Quên mật khẩu?".
4. Quan sát sự thay đổi giao diện và trạng thái màn hình.

## Expected Result

- Ứng dụng chuyển đổi trạng thái điều hướng từ `login` sang `forgotPassword`.
- Giao diện hiển thị tiêu đề màn hình "Quên Mật Khẩu" (`styles.headerCenter`).
- Giao diện hiển thị ô nhập email với nhãn "Nhập Email của bạn" và nút bấm "Lấy mã OTP".

## Actual Result

Login chuyển sang màn hình Quên mật khẩu, hiển thị email và nút OTP.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-001.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cho luồng điều hướng khởi tạo (Entry Navigation) dẫn vào tính năng Quên mật khẩu từ màn hình Đăng nhập của ứng dụng di động.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
