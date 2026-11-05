---
name: Bug Report
title: "[BUG]: Giỏ hàng trống không hiển thị ảnh trạng thái"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Giao diện giỏ hàng trống không có phần tử ảnh được testcase yêu cầu.

Testcase phát hiện: `TC-BVA-FR07-001`, `TC-CART-002`.

## Môi trường
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5173
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Thiết lập giỏ hàng có 0 dòng sản phẩm.
2. Mở trang Giỏ hàng.
3. Quan sát nội dung hiển thị.

## Actual result
Cypress không tìm thấy phần tử `main img` trong 8 giây.

## Expected result
Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho trạng thái trống.

## Evidence
![Evidence TC-BVA-FR07-001](../Screenshot/TC-BVA-FR07-001.png)

![Evidence TC-CART-002](../Screenshot/TC-CART-002.png)
