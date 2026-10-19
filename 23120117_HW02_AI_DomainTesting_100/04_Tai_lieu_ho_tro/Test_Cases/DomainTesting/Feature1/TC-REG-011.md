# TC-REG-011: Từ chối mật khẩu thiếu ký tự đặc biệt yêu cầu

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Trang Đăng ký đã mở.
- Email test chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | an.nguyen11@example.com |
| Mật khẩu | Abcdef12 |

## Test steps
1. Nhập Mật khẩu không có ký tự thuộc tập yêu cầu.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Mật khẩu thiếu ký tự đặc biệt thuộc tập yêu cầu. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
