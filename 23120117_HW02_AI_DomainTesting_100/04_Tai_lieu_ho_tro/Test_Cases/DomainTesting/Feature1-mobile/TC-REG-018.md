# TC-REG-018: Từ chối mật khẩu chỉ có ký tự đặc biệt ngoài tập cho phép

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở và `an.nguyen18@example.com` chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | `an.nguyen18@example.com` |
| Mật khẩu | `Abcdef1#` |

## Test steps
1. Nhập Mật khẩu dài 8 ký tự, có chữ hoa, chữ thường, chữ số và ký tự `#`, nhưng không có ký tự nào thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`.
2. Nhập các trường còn lại theo Test data.
3. Chạm nút `Đăng Ký`.

## Expected result
Đăng ký không thành công vì `#` không thuộc tập ký tự đặc biệt mà FR-01 cho phép; tài khoản không được tạo.

## Status / Related Bugs
Not Run / None
