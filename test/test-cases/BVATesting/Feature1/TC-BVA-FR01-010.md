# TC-BVA-FR01-010: Từ chối mật khẩu không có chữ số

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Theo tiền điều kiện chung

## Test data
| Boundary | Số chữ số = 0 (LB-1) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva010@example.com` |
| Mật khẩu | `ABcdefgh!@$%` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ số.

## Status / Related Bugs
Not Run / None
