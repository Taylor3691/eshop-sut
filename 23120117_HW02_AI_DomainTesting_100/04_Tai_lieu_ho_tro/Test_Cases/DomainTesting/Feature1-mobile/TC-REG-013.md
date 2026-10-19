# TC-REG-013: Từ chối Email thiếu phần tên người dùng

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | `@example.com` |
| Mật khẩu | `Abcdef1@` |

## Test steps
1. Nhập Email thiếu phần đứng trước ký tự `@` và nhập các trường còn lại theo Test data.
2. Chạm nút `Đăng Ký`.

## Expected result
Đăng ký không thành công vì Email không đúng định dạng `user@domain.com`; không tạo tài khoản mới.

## Status / Related Bugs
Not Run / None

