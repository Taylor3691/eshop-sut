# TC-REG-007: Từ chối mật khẩu ngắn hơn 8 ký tự

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Trang Đăng ký đã mở.
- Email test chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | an.nguyen07@example.com |
| Mật khẩu | Aa1@abc |

## Test steps
1. Nhập Mật khẩu 7 ký tự nhưng đủ các thành phần ký tự.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Mật khẩu ngắn hơn 8 ký tự. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
