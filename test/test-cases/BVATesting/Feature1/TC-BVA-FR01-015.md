# TC-BVA-FR01-015: Đăng ký thành công với hai ký tự đặc biệt hợp lệ

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Theo tiền điều kiện chung

## Test data
| Boundary | Số ký tự đặc biệt hợp lệ = 2 (LB+1) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva015@example.com` |
| Mật khẩu | `ABcdefgh12!@` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.

## Status / Related Bugs
Not Run / None
