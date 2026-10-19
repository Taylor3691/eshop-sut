# TC-REG-012: Từ chối Họ Tên chỉ chứa khoảng trắng

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở và `an.nguyen12@example.com` chưa tồn tại.

## Test data
| Họ Tên | `"   "` (ba khoảng trắng) |
| Email | `an.nguyen12@example.com` |
| Mật khẩu | `Abcdef1@` |

## Test steps
1. Nhập ba khoảng trắng vào `Họ Tên` và nhập các trường còn lại theo Test data.
2. Chạm nút `Đăng Ký`.

## Expected result
Đăng ký không thành công vì giá trị chỉ chứa khoảng trắng được xem là thiếu `Họ Tên`; tài khoản không được tạo.

## Status / Related Bugs
Not Run / None

