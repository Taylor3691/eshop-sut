# TC-BVA-FR01-007: Từ chối mật khẩu không có chữ thường

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác.

## Test data
| Boundary | Số chữ thường = 0 (LB-1) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva007@example.com` |
| Mật khẩu | `ABCDEF12!@$%` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ thường.

## Status / Related Bugs
Not Run / None