Title: [BUG][Đăng ký] Đăng ký tài khoản thành công

## Found by Test Case
TC-REG-001

## Requirement liên quan
FR-01

## Severity / Priority
TBD / TBD

## Environment
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5173
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Nhập toàn bộ dữ liệu hợp lệ.
2. Gửi form.
3. Kiểm tra tài khoản và trang đích.

## Expected result
Tài khoản được đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.

## Actual result
CypressError: Timed out retrying after 10000ms: `cy.wait()` timed out waiting `10000ms` for the 1st request to the route: `register`. No request ever occurred.

## Evidence
![Evidence TC-REG-001](../../Screenshot/TC-REG-001.png)
