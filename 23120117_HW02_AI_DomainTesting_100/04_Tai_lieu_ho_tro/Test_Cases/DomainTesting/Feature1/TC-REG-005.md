# TC-REG-005: Từ chối đăng ký với Email đã tồn tại

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Trang Đăng ký đã mở.
- `existing.user@example.com` đã tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | existing.user@example.com |
| Mật khẩu | Abcdef1@ |

## Test steps
1. Nhập Email đã tồn tại.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công vì Email không duy nhất. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
