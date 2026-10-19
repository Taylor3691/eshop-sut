# TC-REG-016: Từ chối Email chứa khoảng trắng

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.
- Trang Đăng ký đã mở.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | `user @example.com` |
| Mật khẩu | `Abcdef1@` |

## Test steps
1. Nhập Email có khoảng trắng và nhập các trường còn lại theo Test data.
2. Chạm nút `Đăng Ký`.

## Expected result
Đăng ký không thành công vì Email chứa khoảng trắng không đúng định dạng; không tạo tài khoản mới.

## Status / Related Bugs
Not Run / None
