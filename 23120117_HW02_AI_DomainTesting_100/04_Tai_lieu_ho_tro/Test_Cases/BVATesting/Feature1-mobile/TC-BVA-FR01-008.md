# TC-BVA-FR01-008: Đăng ký thành công với một chữ thường

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác.

## Test data
| Boundary | Số chữ thường = 1 (LB) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva008@example.com` |
| Mật khẩu | `ABCDEa12!@$%` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.

## Status / Related Bugs
Not Run / None
