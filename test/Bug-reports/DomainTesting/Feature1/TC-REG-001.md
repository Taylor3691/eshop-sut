Title: [BUG][Đăng ký] Đăng ký tài khoản thành công

## Found by Test Case
TC-REG-001

## Requirement liên quan
FR-01

## Severity / Priority
High / High

## Environment
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5173
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Nhập toàn bộ dữ liệu hợp lệ.
2. Gửi form.
3. Kiểm tra tài khoản và trang đích.

## Expected result
Tài khoản được đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.

## Actual result
Sau khi gửi form với mật khẩu đáp ứng FR-01, frontend không phát sinh POST /api/register; Cypress hết thời gian chờ request đăng ký.

## Evidence
![Evidence TC-REG-001](../../Screenshot/TC-REG-001.png)
