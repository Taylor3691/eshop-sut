---
name: Bug Report
title: "[BUG]: Các mật khẩu hợp lệ bị chặn trước khi gửi yêu cầu đăng ký"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Các testcase yêu cầu đăng ký thành công với mật khẩu hợp lệ không tạo request `register`; Cypress hết thời gian chờ request.

Testcase phát hiện: `TC-BVA-FR01-002`, `TC-BVA-FR01-003`, `TC-BVA-FR01-005`, `TC-BVA-FR01-006`, `TC-BVA-FR01-008`, `TC-BVA-FR01-009`, `TC-BVA-FR01-011`, `TC-BVA-FR01-012`, `TC-BVA-FR01-014`, `TC-BVA-FR01-015`, `TC-REG-001`.

## Môi trường
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5173
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Nhập các giá trị như Test data.
2. Gửi form đăng ký.

## Actual result
Không có request đăng ký được gửi trong 10 giây; Cypress timeout khi chờ alias `register`.

## Expected result
Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.

## Evidence
![Evidence TC-BVA-FR01-002](../Screenshot/TC-BVA-FR01-002.png)

![Evidence TC-BVA-FR01-003](../Screenshot/TC-BVA-FR01-003.png)

![Evidence TC-BVA-FR01-005](../Screenshot/TC-BVA-FR01-005.png)

![Evidence TC-BVA-FR01-006](../Screenshot/TC-BVA-FR01-006.png)

![Evidence TC-BVA-FR01-008](../Screenshot/TC-BVA-FR01-008.png)

![Evidence TC-BVA-FR01-009](../Screenshot/TC-BVA-FR01-009.png)

![Evidence TC-BVA-FR01-011](../Screenshot/TC-BVA-FR01-011.png)

![Evidence TC-BVA-FR01-012](../Screenshot/TC-BVA-FR01-012.png)

![Evidence TC-BVA-FR01-014](../Screenshot/TC-BVA-FR01-014.png)

![Evidence TC-BVA-FR01-015](../Screenshot/TC-BVA-FR01-015.png)

![Evidence TC-REG-001](../Screenshot/TC-REG-001.png)
