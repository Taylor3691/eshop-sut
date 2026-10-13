# TC-REG-006: Từ chối đăng ký khi thiếu Mật khẩu

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Trang Đăng ký đã mở.
- Email test chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | an.nguyen06@example.com |
| Mật khẩu | `""` |

## Test steps
1. Để trống Mật khẩu.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do thiếu Mật khẩu. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
