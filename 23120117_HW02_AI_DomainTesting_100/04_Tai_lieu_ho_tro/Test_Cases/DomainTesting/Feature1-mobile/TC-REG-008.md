# TC-REG-008: Từ chối mật khẩu thiếu chữ hoa

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
| Email | an.nguyen08@example.com |
| Mật khẩu | abcdef1@ |

## Test steps
1. Nhập Mật khẩu không có chữ hoa.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Mật khẩu thiếu chữ hoa. Message cụ thể: Mật khẩu quá yếu! Phải dài tối thiếu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT

## Status / Related Bugs
Not Run / None
