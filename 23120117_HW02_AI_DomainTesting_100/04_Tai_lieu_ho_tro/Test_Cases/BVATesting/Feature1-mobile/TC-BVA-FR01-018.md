# TC-BVA-FR01-018: Đăng ký thành công với Họ Tên dài 2 ký tự

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Người dùng đang ở trang Đăng ký và `bva018@example.com` chưa tồn tại.

## Test data
| Boundary | Độ dài Họ Tên = 2 (LB+1) |
| Họ Tên | `An` |
| Email | `bva018@example.com` |
| Mật khẩu | `Abcdef1@` |

## Test steps
1. Nhập các giá trị theo Test data.
2. Chạm nút `Đăng Ký`.

## Expected result
Đăng ký thành công với Họ Tên dài 2 ký tự và người dùng được chuyển tới trang Đăng nhập.

## Status / Related Bugs
Not Run / None
