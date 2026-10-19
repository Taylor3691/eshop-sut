# TC-REG-019: Chấp nhận từng ký tự đặc biệt được FR-01 cho phép

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở.
- Các Email trong Test data chưa tồn tại; mỗi dòng dữ liệu được thực hiện độc lập.

## Test data
| Lần chạy | Email | Mật khẩu | Ký tự cần kiểm tra |
| --- | --- | --- | --- |
| 1 | `special.at@example.com` | `Abcdef1@` | `@` |
| 2 | `special.dollar@example.com` | `Abcdef1$` | `$` |
| 3 | `special.exclamation@example.com` | `Abcdef1!` | `!` |
| 4 | `special.percent@example.com` | `Abcdef1%` | `%` |
| 5 | `special.asterisk@example.com` | `Abcdef1*` | `*` |
| 6 | `special.question@example.com` | `Abcdef1?` | `?` |
| 7 | `special.ampersand@example.com` | `Abcdef1&` | `&` |

## Test steps
1. Với từng dòng Test data, nhập `Nguyễn Văn An` vào `Họ Tên`, sau đó nhập Email và Mật khẩu tương ứng.
2. Chạm nút `Đăng Ký`.
3. Xác nhận kết quả, hoàn tác tài khoản vừa tạo và quay lại trang Đăng ký trước khi chạy dòng tiếp theo.

## Expected result
Ở cả 7 lần chạy, đăng ký thành công vì Mật khẩu dài 8 ký tự, có đủ chữ hoa, chữ thường, chữ số và một ký tự đặc biệt thuộc đúng tập FR-01; người dùng được chuyển tới trang Đăng nhập.

## Status / Related Bugs
Not Run / None
