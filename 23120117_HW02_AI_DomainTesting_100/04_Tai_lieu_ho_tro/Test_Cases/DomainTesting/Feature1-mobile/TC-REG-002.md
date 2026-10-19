# TC-REG-002: Từ chối đăng ký khi thiếu Họ Tên

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở.
- Email test chưa tồn tại.

## Test data
| Họ Tên | `""` |
| Email | an.nguyen02@example.com |
| Mật khẩu | Abcdef1@ |

## Test steps
1. Để trống Họ Tên.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do thiếu Họ Tên. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
