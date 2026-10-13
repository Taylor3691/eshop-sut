# TC-REG-001: Đăng ký tài khoản thành công

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Trang Đăng ký đã mở.
- `an.nguyen01@example.com` chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | an.nguyen01@example.com |
| Mật khẩu | Abcdef1@ |

## Test steps
1. Nhập toàn bộ dữ liệu hợp lệ.
2. Gửi form.
3. Kiểm tra tài khoản và trang đích.

## Expected result
Tài khoản được đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.

## Status / Related Bugs
Not Run / None
