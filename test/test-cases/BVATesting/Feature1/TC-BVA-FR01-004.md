# TC-BVA-FR01-004: Từ chối mật khẩu không có chữ hoa

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Theo tiền điều kiện chung

## Test data
| Boundary | Số chữ hoa = 0 (LB-1) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva004@example.com` |
| Mật khẩu | `abcdef12!@$%` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ hoa.

## Status / Related Bugs
Not Run / None
