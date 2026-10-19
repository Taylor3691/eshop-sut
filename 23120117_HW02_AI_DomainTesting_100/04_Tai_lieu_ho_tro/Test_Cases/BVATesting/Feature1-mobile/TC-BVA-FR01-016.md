# TC-BVA-FR01-016: Từ chối Họ Tên có độ dài 0 ký tự

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Người dùng đang ở trang Đăng ký và `bva016@example.com` chưa tồn tại.

## Test data
| Boundary | Độ dài Họ Tên = 0 (LB-1) |
| Họ Tên | `""` |
| Email | `bva016@example.com` |
| Mật khẩu | `Abcdef1@` |

## Test steps
1. Để trống trường `Họ Tên` và nhập Email, Mật khẩu theo Test data.
2. Chạm nút `Đăng Ký`.

## Expected result
Hệ thống từ chối đăng ký vì `Họ Tên` là trường bắt buộc; tài khoản `bva016@example.com` không được tạo.

## Status / Related Bugs
Not Run / None
