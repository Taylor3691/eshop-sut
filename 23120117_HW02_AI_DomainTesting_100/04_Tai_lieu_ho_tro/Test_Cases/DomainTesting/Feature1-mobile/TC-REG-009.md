# TC-REG-009: Từ chối mật khẩu thiếu chữ thường

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở.
- Email test chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | an.nguyen09@example.com |
| Mật khẩu | ABCDEF1@ |

## Test steps
1. Nhập Mật khẩu không có chữ thường.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Mật khẩu thiếu chữ thường. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None