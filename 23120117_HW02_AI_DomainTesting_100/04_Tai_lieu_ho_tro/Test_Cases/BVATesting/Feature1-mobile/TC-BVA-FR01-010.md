# TC-BVA-FR01-010: Từ chối mật khẩu không có chữ số

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác.

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
