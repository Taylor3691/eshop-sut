# TC-REG-003: Từ chối đăng ký khi thiếu Email

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Trang Đăng ký đã mở.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | `""` |
| Mật khẩu | Abcdef1@ |

## Test steps
1. Để trống Email.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do thiếu Email. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
