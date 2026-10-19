---
name: Bug Report
title: "[BUG]: Coupon có type ngoài tập hợp vẫn được chấp nhận"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Hệ thống chấp nhận tạo coupon với giá trị `type` ngoài tập hợp hợp lệ.

Testcase phát hiện: `TC-COUPON-006`.

## Môi trường
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5174
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Gửi `POST /api/admin/coupons` với token Admin và body đúng Test data; chỉ `type` là `other`.

## Actual result
Request tạo coupon trả HTTP 200 thay vì mã lỗi 4xx.

## Expected result
Từ chối tạo vì `type` không hợp lệ; không khẳng định message. Đây là API-level test vì select UI chỉ có `percent` và `fixed`.

## Evidence
![Evidence TC-COUPON-006](../Screenshot/TC-COUPON-006.png)
