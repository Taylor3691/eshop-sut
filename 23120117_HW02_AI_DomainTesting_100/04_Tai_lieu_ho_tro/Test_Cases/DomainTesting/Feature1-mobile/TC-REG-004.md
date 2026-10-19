# TC-REG-004: Từ chối đăng ký với Email sai định dạng

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở.
- Chuỗi Email test chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | user.example.com |
| Mật khẩu | Abcdef1@ |

## Test steps
1. Nhập Email sai dạng.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Email không hợp lệ. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
