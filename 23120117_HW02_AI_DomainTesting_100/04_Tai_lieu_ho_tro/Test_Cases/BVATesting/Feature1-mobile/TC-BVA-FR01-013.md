# TC-BVA-FR01-013: Từ chối mật khẩu không có ký tự đặc biệt hợp lệ

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký tài khoản / Functional / Boundary Value Analysis

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác.

## Test data
| Boundary | Số ký tự đặc biệt hợp lệ = 0 (LB-1) |
| Họ Tên | `Nguyễn Văn An` |
| Email | `bva013@example.com` |
| Mật khẩu | `ABcdefgh1234` |

## Test steps
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Expected result
Hệ thống từ chối đăng ký vì Mật khẩu thiếu ký tự đặc biệt hợp lệ.

## Status / Related Bugs
Not Run / None
