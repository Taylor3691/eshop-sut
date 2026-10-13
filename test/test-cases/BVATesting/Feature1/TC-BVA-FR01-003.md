# TC-BVA-FR01-003: Đăng ký thành công với mật khẩu dài 9 ký tự

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Theo tiền điều kiện chung

## Test data
| Boundary | Độ dài Mật khẩu = 9 (LB+1) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva003@example.com` |
| Mật khẩu | `ABcde12!@` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.

## Status / Related Bugs
Not Run / None
