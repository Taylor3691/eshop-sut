Title: [PASS][Đăng ký] Từ chối mật khẩu thiếu chữ số

## Found by Test Case
TC-REG-010

## Requirement liên quan
FR-01

## Severity / Priority
N/A / N/A

## Environment
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5173
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Nhập Mật khẩu không có chữ số.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Mật khẩu thiếu chữ số. Message cụ thể chưa được mô tả.

## Actual result
Cypress thực thi testcase trong 1392 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-REG-010](../../Screenshot/TC-REG-010.png)
