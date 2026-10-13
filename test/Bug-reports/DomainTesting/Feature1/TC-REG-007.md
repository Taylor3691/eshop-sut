Title: [PASS][Đăng ký] Từ chối mật khẩu ngắn hơn 8 ký tự

## Found by Test Case
TC-REG-007

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
1. Nhập Mật khẩu 7 ký tự nhưng đủ các thành phần ký tự.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Mật khẩu ngắn hơn 8 ký tự. Message cụ thể chưa được mô tả.

## Actual result
Cypress thực thi testcase trong 1417 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-REG-007](../../Screenshot/TC-REG-007.png)
