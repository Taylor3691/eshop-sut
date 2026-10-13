Title: [PASS][Đăng ký] Từ chối đăng ký với Email sai định dạng

## Found by Test Case
TC-REG-004

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
1. Nhập Email sai dạng.
2. Nhập các trường khác hợp lệ.
3. Gửi form.

## Expected result
Đăng ký không thành công do Email không hợp lệ. Message cụ thể chưa được mô tả.

## Actual result
Cypress thực thi testcase trong 1173 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-REG-004](../../Screenshot/TC-REG-004.png)
