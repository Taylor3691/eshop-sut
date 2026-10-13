# TC-BVA-FR01-001: Từ chối mật khẩu dài 7 ký tự

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Theo tiền điều kiện chung

## Test data
| Boundary | Độ dài Mật khẩu = 7 (LB-1) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva001@example.com` |
| Mật khẩu | `ABcd1!@` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Hệ thống từ chối đăng ký vì Mật khẩu dưới 8 ký tự.

## Status / Related Bugs
Not Run / None
